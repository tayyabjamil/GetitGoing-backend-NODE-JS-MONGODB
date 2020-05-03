const mongoose = require('mongoose');

const path = "mongodb://localhost:27017/Fyp";
 const mongo = mongoose.connect(path,{useNewUrlParser:true});
 mongo.then(() =>{
     console.log('connected with mongo db');

 }
 ).catch((err)=>{
     console.log('err',err);
 }
 ) 