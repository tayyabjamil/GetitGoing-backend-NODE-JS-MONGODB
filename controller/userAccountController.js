const express = require("express");
var router = express.Router();
var  userAccount  = require("../models/userAccount");
const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const bcyrpt = require("bcrypt");


router.post("/signUp", (req, res) => {
    userAccount
      .find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "mail already exist"
          });
        } else {
     
              var userData = new userAccount({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                email: req.body.email,
                password:req.body.password
          
              });
              userData.save((error, userData) => {
                if (error) {
                  console.log(error);
                } else {
                  res.status(200).send({userData});
             
                }
              });
             
            }
          });
        })
        router.post("/login", (req, res) => {
          userAccount
          .find({email:req.body.email})
        
          .exec()
          .then(user => {
            if (user.length < 1) {
              return res.status(404).json({
                message: "user not found"
              });
            } else {
              if(user[0].password !== req.body.password){
                return res.status(200).json({
                  message: "wrong password "
                });
                  
              }
            }
          console.log('login');
          userId = user[0].id;
          res.status(200).send({  userId });
          })
          })
          
        router.get("/", (req, res) => {
          userAccount.find((err, docs) => {
            if (!err) {
              res.send(docs);
            } else {
              console.log(
                "Error in Retriving userAccounts:" + JSON.stringify(err, undefined, 2)
              );
            }
          });
        });
        
        module.exports = router;