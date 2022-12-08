//jshint esversion:6
const mongoose = require('mongoose');
const journeyinfo = mongoose.Schema({
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
  },
  traveltime:{
    type: String,
    required: true
  }
});
mongoose.model('Journey',journeyinfo);
