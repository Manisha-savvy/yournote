const express = require('express')
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { exists } = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Manishaworksasa$$$ELOPER'


router.post('/',[body('email',"Please enter a valid Email").isEmail(),

body('password',"Please ensure password is atleast 5 characters").isLength({ min: 5 }),
body('name', "Please ensure username is atleast 3 charcters").isLength({ min: 3 })],
   async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // To check if user already exists.
    let user = await User.findOne({email: req.body.email})
    if (user){
        return res.status(400).json({error: "Email already exist."})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    try{user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      })
      
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);

    res.json({authToken})
  }catch(err){
        console.error(err.message); 
        res.status(500).send("Some error Occured");
    }
})

module.exports = router