const express = require('express')
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { exists } = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'Manishaworksasa$$$ELOPER'

//Route 1: Create a user using: POST "/api/auth/createuser". No user required.
router.post('/createuser',[
body('email',"Please enter a valid Email").isEmail(),
body('password',"Please ensure password is atleast 5 characters").isLength({ min: 5 }),
body('name', "Please ensure username is atleast 3 charcters").isLength({ min: 3 })],
   async (req,res)=>{
     let success = false;
// If errors return badrequest and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({sucess, errors: errors.array() });
    }
    // To check if user already exists.
    let user = await User.findOne({email: req.body.email})
    if (user){
        return res.status(400).json({sucess,error: "Email already exist."})
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
      success=true

    res.json({sucess,authToken})
  }catch(err){
        console.error(err.message); 
        res.status(500).send("Some error Occured");
    }
})

//Route 2: Authenticate the user: POST "/api/auth/login user". Login required. 
router.post('/login',[
  body('email',"Please enter a valid Email").isEmail(),
  body('password',"Password cannot be blank").exists()

], async (req, res) => {
// If errors return badrequest and the error
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

const {email, password} = req.body;
try{
  let user = await User.findOne({email});
  if(!user){
    return res.status(400).json({error: "Please try to login with the correct credentials"});
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if(!passwordCompare){
    return res.status(400).json({error: "Please try to login with the correct credentials"});
  }

  const data = {
    user: {
      id: user.id
    }
  }
  const authToken = jwt.sign(data, JWT_SECRET);
  res.json({authToken})
} catch(err){
  console.error(err.message); 
  res.status(500).send("Internal server error Occured");
}


})

//Route 3: Get loggedin User Details usiing POST "/api/auth/getuser". Login required.
router.post('/getuser', fetchuser, async (req, res) => {

try{
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
}catch(err){
  console.error(err.message); 
  res.status(500).send("Internal server error Occured");
}
})
module.exports = router