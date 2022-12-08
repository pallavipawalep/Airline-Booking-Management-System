//jshint esversion:6
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://pallavipawale:Ppawale@cluster0.tv0cw59.mongodb.net/DBMSPRO?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("Connected");
}).catch((e)=>{
  console.log(e);
  console.log("no connection");
});

require('./models/schema');
require('./models/registrationschema.js');
require('./models/journey');
require('./models/booking');
