//jshint esversion:6
const mongoose = require('mongoose');
const validate = require('validator');
const bookticket = mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    validate(value){
        if(!validate.isEmail(value)){
            throw new Error("Invalid email");
        }
    }
  },
  mobnumber:{
    type: String,
    required: true,
  },
  source:{
    type: String,
    required: true
  },
  destination:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  }
});

mongoose.model('Booking',bookticket);
