const mongoose = require('mongoose')
const express = require ('express')
var router =express.Router();
const multer = require("multer");
var path = require("path");
const RegisterCar = require("../models/registerCar")
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
        const registerCar = new RegisterCar({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          amount:req.body.amount,
          location: req.body.location,
          about: req.body.about,
          contact: req.body.contact,
          date:req.body.date,
          mainImage:req.body.mainImage,
          multipleImages:req.body.multipleImages,
          userAccount: req.body.userAccountId
        });
        return registerCar.save();
      })
      .then(registerCar => {
        res.send(registerCar);
        res.status(201).json({
          message: "CAR Registered "
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.get("/", (req, res) => {
    RegisterCar.find().select('name amount location mainImage')
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
  router.get("/carDetails/:id", async(req, res) => { 
    await RegisterCar.findOne({_id:req.params.id})
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
  router.get("/:id", (req, res) => {
    RegisterCar.find({ userAccount: req.params.id })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(404).json({
            message: "No Venuew Registered"
          });
        } else {
          res.send(user);
        }
      });
  });
module.exports=router;
