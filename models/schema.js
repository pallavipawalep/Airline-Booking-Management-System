//jshint esversion:6
const mongoose = require('mongoose');

const personschema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
    type: String,
    unique: true,
    required: [true, 'User phone number required']
  }
});

mongoose.model('PersonSchema',personschema);
