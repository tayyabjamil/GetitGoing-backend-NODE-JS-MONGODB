const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();

const CampaignStory = require("../models/campaignStory")
const StartCampaign = require("../models/startCampaign")
// const chechAuth = require('../.vscode/middleware/check-auth')

var router = express.Router();
const multer = require("multer");
var path = require("path");
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


router.post("/", (req, res, next) => { 
  StartCampaign.findById(req.body.startCampaignId)
  .exec()
    .then(startCampaign => {
      if (!startCampaign) {
        return res.status(404).json({
          message: "Campagin not found"
        });
      }
      const campaignStory = new CampaignStory({
   
        _id: new mongoose.Types.ObjectId(),
        // storyImage: req.file.path,
        details: req.body.details,
        startCampaign:req.body.startCampaignId,
      });
      return campaignStory.save();
    })
    .then(result => {
      res.send(result)
      res.status(201).json({
        message: "Story Posted",
      });
    })
    .catch(err => {
      console.log('NO Campaign found');
      return res.status(404).json({
        message: "No Campaign found"
      });
    });
});
router.get('/:id',(req,res)=>{
  CampaignStory.find({startCampaign:req.params.id})
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(404).json({
        message: "No Story Posted"
      });
    }else{
      res.send(user)
    }
  
  }
  )
})
router.get('/',(req,res)=>{
  CampaignStory.find()
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(404).json({
        message: "No Story Posted"
      });
    }else{
      res.send(user)
    }
  
  }
  )
})

  module.exports = router;
