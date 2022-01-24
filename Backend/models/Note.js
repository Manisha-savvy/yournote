const mongoose = require('mongoose');

const { Schema } = mongoose;

  const notesSchema = new Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true,
        unique:true
    },
    tag:{
        type:String,
        default: "General"
    },
    date:{
        type:Date,
       default : Date.now
    },


  });

//   notes below is the name of the model that will be created newly
  module.exports = mongoose.model('notes',notesSchema);