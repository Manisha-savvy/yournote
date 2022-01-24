const mongoose = require('mongoose');

const { Schema } = mongoose;

  const notesSchema = new Schema({
    title:{
        type:string,
        required:true
    },

    description:{
        type:string,
        required:true,
        unique:true
    },
    tag:{
        type:string,
        default: "General"
    },
    date:{
        type:Date,
       default : Date.now
    },


  });

//   notes below is the name of the model that will be created newly
  module.exports = mongoose.model('notes',notesSchema);