const mongoose = require('mongoose')
const express = require ('express')
var router =express.Router();
const multer = require("multer");
var path = require("path");
const RegisterHall = require("../models/registerHall")
const UserAccount = require("../models/userAccount");

const fileimageFilter = (req, file, cb) => {
    var campaignImage = path.extname(file.originalname);
    if (
      campaignImage !== ".png" &&
      campaignImage !== ".jpg" &&
      campaignImage !== ".gif" &&
      campaignImage !== ".jpeg"
    ) {
      {
        console.log("Error");
        cb(null, false);
        return cb(new Error("Only images are allowed"));
      }
    } else {
      console.log("image uploaded");
      cb(null, true);
    }
  };
  
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./public/uploads/");
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileimageFilter
  });

  router.post("/",upload.single('mainImage'), (req, res, next) => {

 
    UserAccount.findById(req.body.userAccountId)
      .exec()
      .then(userAccount => {
        if (!userAccount) {
          return res.status(404).json({  
            message: "Account not found"
          });
        }
        const registerHall = new RegisterHall({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email:req.body.email,
          location: req.body.location,
          startBookingAmount: req.body.startBookingAmount,
          about: req.body.about,
          contact: req.body.contact,
          services: req.body.services,
          mainImage:req.file,
          userAccount: req.body.userAccountId
        });
        return registerHall.save();
      })
      .then(registerHall => {
        res.send(registerHall);
        res.status(201).json({
          message: "HALL Registered "
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
// router.post('/',(req,res)=>{
// var registerHallData = new RegisterHall({
//     name:req.body.name,
//     location: req.body.location,
//     booking:req.body.booking
  
  
// })
// registerHallData.
// save((error, registerHallData) => {
//     if (error) {
//       console.log(error);
//     } else {
//       res.status(200).send({registerHallData});
 
//     }
//   });

// })
router.get("/", (req, res) => {
    RegisterHall.find().select('name startBookingAmount location')
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(404).json({
            message: "No campaigns Posted"
          });
        } else {
          res.send(user);
        }
      })
  });
  router.get("/hallDetails/:id", async(req, res) => {
    await RegisterHall.findOne({_id:req.params.id})
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(404).json({
            message: "No Hall Registered"
          });
        } else {
          res.send(user);
        }
      }).catch(err=>{
        console.log(err)
      });
  });
  
module.exports=router;
