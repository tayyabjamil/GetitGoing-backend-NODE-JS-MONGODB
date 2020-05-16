const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();

const StartCampaign = require("../models/startCampaign");
const UserAccount = require("../models/userAccount");
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
router.get("/campaignData/:id", async(req, res) => {
  await StartCampaign.findOne({_id:req.params.id})
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "No campaigns Posted"
        });
      } else {
        res.send(user);
      }
    }).catch(err=>{
      console.log(err)
    });
});
router.get("/:id", (req, res) => {
  StartCampaign.find({ userAccount: req.params.id })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "No campaigns Posted"
        });
      } else {
        res.send(user);
      }
    });
});
router.get("/", (req, res) => {
  StartCampaign.find().select('title tagline amount mainImage type')
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
// router.post('/file', upload.single('file'), (req, res, next) => {
//   const file = req.file;
//   // console.log(file.filename);
//   if (!file) {
//     const error = new Error('No File')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//     res.send(file);
// })
router.post("/",upload.single('mainImage'), (req, res, next) => {

 
  UserAccount.findById(req.body.userAccountId)
    .exec()
    .then(userAccount => {
      if (!userAccount) {
        return res.status(404).json({  
          message: "Account not found"
        });
      }
      const startCampaign = new StartCampaign({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        tagline: req.body.tagline,
        amount: req.body.amount,
        description: req.body.description,
        type: req.body.type,
        pledgeAmount1: req.body.pledgeAmount1,
        pledgeAmount2: req.body.pledgeAmount2,
        pledgeAmount3: req.body.pledgeAmount3,
        rewardDetails1: req.body.rewardDetails1,
        rewardDetails2: req.body.rewardDetails2,
        rewardDetails3: req.body.rewardDetails3,
        mainImage:req.body.mainImage,
        multipleImages:req.body.multipleImages,
        vedio:req.body.vedio,
        userAccount: req.body.userAccountId
      });
      return startCampaign.save();
    })
    .then(result => {
    
      res.status(201).json({
        message: "CAmpaign Posted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
    
      });
    });
});

var mkdirp = require("mkdirp");

module.exports = router;

// // router.post('/:startCampaignId/campaignImage',uploadImage.single("campaignImage"),(req,res)=>{

// //   //find User Account
// //   const startCampaign = await StartCampaign.findOne({_id:req.params.startCampaignId})
// //   const campaignImage = new CampaignImage();
// //  campaignImage.campaignImage= req.file.path,
// // campaignImage.filename=req.body.filename,

// // campaignImage.startCampaign=startCampaign._id;
// //  await campaignImage.save();

// // // // //associate userAccount with course
// // startCampaign.campaignImages.push(campaignImage._id);
// // await startCampaign.save();

// // res.send(startCampaign);
// // })

// // router.post('/:startCampaignId/campaignVedio',uploadVedio.single("campaignVedio"),(req,res)=>{

// //   //find User Account
// //   const startCampaign = await StartCampaign.findOne({_id:req.params.startCampaignId})
// //   const campaignVedio = new CampaignVedio();
// //  campaignVedio.campaignVedio= req.file.path,
// // campaignVedio.filename=req.body.filename,

// // campaignVedio.startCampaign=startCampaign._id;
// //  await campaignVedio.save();

// // // // //associate userAccount with course
// // startCampaign.campaignVedios.push(campaignVedio._id);

// // await startCampaign.save()
// // .then(result => {
// //   console.log(result);
// // })
// // .catch(err => console.log(err));
// // res.status(201).json({
// // createdVedio: campaignVedio
// // });;

// res.send(startCampaign);

// })

// router.post('/:startCampaignId/backCampagin',(req,res)=>{

//   const startCampaign = await StartCampaign.findOne({_id:req.params.startCampaignId})

//   const campaignBacker = new CampaignBacker();
//  campaignBacker.name=req.body.name,
// //  campaignBacker.id=require.body.id,

//  campaignBacker.startCampaign=startCampaign._id;
//  await campaignBacker.save();

// // // //associate userAccount with course
// startCampaign.campaignBackers.push(campaignBacker._id);
// await startCampaign.save();

// res.send(startCampaign);
// })
// router.post('/:startCampaignId/campaignUpdate',(req,res)=>{

//   const startCampaign = await StartCampaign.findOne({_id:req.params.startCampaignId})

//   const campaignUpdate = new CampaignUpdate();
//  campaignUpdate.comingUpdate=req.body.comingUpdate,

//  campaignUpdate.startCampaign=startCampaign._id;
//  await campaignUpdate.save();

// // // //associate userAccount with course
// startCampaign.campaignUpdates.push(campaignUpdate._id);
// await startCampaign.save();

// res.send(startCampaign);
// })

// router.post('/:startCampaignId/campaignStory',(req,res)=>{

//   const startCampaign = await StartCampaign.findOne({_id:req.params.startCampaignId})

//   const campaignStory = new CampaignStory();
//  campaignStory.date=req.body.date,

//     campaignStory.progress-req.body.progress,
//     campaignStory.details=req.body.details

//  campaignStory.startCampaign=startCampaign._id;
//  await campaignStory.save();

// // // //associate userAccount with course
// startCampaign.campaignStories.push(campaignStory._id);
// await startCampaign.save();

// res.send(startCampaign);
// })
