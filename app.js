//jshint esversion:6
const validate = require('validator');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
require('./conn');
const port = process.env.PORT || 3000;
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const { json } = require("express");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
//models
const UserRegistration = mongoose.model('UserRegistration');
const Journey = mongoose.model('Journey');
const Booking = mongoose.model('Booking');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





//css path image path
// app.use(express.static(path.join(__dirname , './css')));
app.use(express.static(path.join(__dirname ,'./images')));

app.set('views',path.join(__dirname,'/views/'));
app.engine('.hbs',exphbs.engine({ extname: '.hbs', defaultLayout: "index", layoutDir: __dirname + '/views/layouts/',handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine','hbs');

app.get('/',(req,res)=>{
  res.render('pages/registration');
});
app.get('/login',(req,res)=>{
  res.render('pages/login');
});
app.post("/userregistration",(req,res)=>{
    try{
        const registeremply = new UserRegistration({
            fullname: req.body.fullname,
            date: req.body.date,
            gender: req.body.gender,
            age: req.body.age,
            phonenumber: req.body.phonenumber,
            occupation: req.body.occupation,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword
        });
        const result = registeremply.save();
        console.log(result);
        res.status(201).render("pages/home");
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }
});
app.post('/userlogin',async (req,res)=>{
  try{
    const email = req.body.email;
    const password = req.body.password;
    const userinfo = await UserRegistration.findOne({email:email});
    if(userinfo.password==password){
      res.render('pages/home');
    }
    else{
      res.render('pages/login',{mesg: true});
    }
  } catch(err){
    console.log(err);
  }
});
app.post('/search',async (req,res)=>{
  try{
    const source = req.body.source;
    const destination = req.body.destination;
    const journey = await Journey.findOne({source:source,destination:destination});
    if(journey.source == source){
      res.render('pages/booking',{ sourcebook: source, destbook: destination});
    }
    else{
      res.send("Destination is not available..");
    }
  } catch(err){
    console.log(err);
  }
});

app.get('/journeywrite',(req,res)=>{
  res.render('pages/journey');
});
app.post('/journey',(req,res)=>{
  try{
    const journeyinfo = new Journey({
      source:req.body.source,
      destination: req.body.destination,
      date:req.body.date,
      traveltime:req.body.traveltime
    });
    const data = journeyinfo.save();
    res.status(201).send("data");

  } catch(err){
    console.log(err);
  }
});
app.post('/booking',(req,res)=>{
  try{
    const book = new Booking({
      name: req.body.name,
      email: req.body.email,
      mobnumber: req.body.mobnumber,
      source: req.body.source,
      destination: req.body.destination,
      date: req.body.date
    });
    const data = book.save();
    res.status(201).render('pages/home');
  } catch(err){
    console.log(err);
  }
});
app.post('/ticketshow',async (req,res)=>{
  try{
    const email = req.body.email;
    const userinfo = await Booking.findOne({email:email});
    if(userinfo.email==email){
      const allinfo = await Booking.find({email: email});
      res.render('pages/home',{ ticket: true, listticket: allinfo});
    }
    else{
      res.render('pages/login',{mesg: true});
    }
  } catch(err){
    console.log(err);
  }
});
app.get('/ticket/:id',async (req,res)=>{
  try{
    Booking.findById(req.params.id,(err,doc)=>{
      if(!err){
        res.render('pages/ticket', {list:doc, Time: "12.00",traveltime: "13"});
      }
      else{
        console.log(err);
      }
    });
  } catch(err){
    console.log(err);
  }
});
app.get('/cancle/:id', async(req,res)=>{
  try{
    const id = req.params.id;
    res.render('pages/cancle',{id:id});
  } catch(err){
    console.log(err);
  }
});
app.post('/ticketcancle/:id', async(req,res)=>{
  try{
    Booking.findByIdAndRemove(req.params.id, (err,docs)=>{
      if(!err){
        res.render('pages/home');
      }
      else{
        consoel.log(err);
      }
    });
  } catch(err){
    console.log(err);
  }
});
app.listen(port,()=>{
  console.log(`server is listening to port ${port}`);
});
