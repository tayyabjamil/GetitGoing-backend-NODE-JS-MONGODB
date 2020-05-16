const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const multer = require("multer");
const CampaignImage = require("../models/campaignImage");
var path = require("path");
const StartCampaign = require("../models/startCampaign")

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

router.post('/upload',upload.single('mainImage'),(req,res)=>{

  StartCampaign.findById(req.body.startCampaignId)
  .exec()
  .then(startCampaign => {
    if(!startCampaign){
      return res.status(404).json({
        message:"campaign NOt found"
      })
    }
     const campaignImage = new CampaignImage({
      mainImage: req.file.path,
      startCampaign:req.body.startCampaignId,
    });
  
    return campaignImage.save();
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  })
  .then(result => {
    res.send(result)
    res.status(201).json({
      message: "Image Uploaded",
    });
  })
  .catch(err => {
    console.log('NO Campaign found');
    return res.status(404).json({
      message: "No Campaign found"
    });
  });
});

router.get('/',(req,res)=>{
  CampaignImage.find()
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(404).json({
        message: "No Image Uploaded"
      });
    }else{
      res.send(user)
    }
})
})
router.get('/:id',(req,res)=>{
  CampaignImage.find({startCampaign:req.body.startCampaignId})
.exec()
.then(user =>{
  if (user.length < 1) {
    return res.status(404).json({
      message: "No Image Uploaded"
    });
  }else{
    res.send(user)
  }
})
})
module.exports = router;
