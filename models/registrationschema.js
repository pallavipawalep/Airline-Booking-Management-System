//jshint esversion:6
const mongoose = require('mongoose');
const validate  = require('validator');
const userregistration = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        validate(value){
            if(!validate.isAlpha(value)){
                throw new Error("Invalid Name");
            }
        }
    },
    date:{
        type: String,
        default: new Date()
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phonenumber:{
        type: Number,
        unique : true,
        required: true
    },
    occupation: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        validate(value){
            if(!validate.isEmail(value)){
                throw new Error("Invalid email");
            }
        }
      },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    }
});

mongoose.model("UserRegistration",userregistration);
