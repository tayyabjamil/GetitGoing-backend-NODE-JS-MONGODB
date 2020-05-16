const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const multer = require("multer");
const CampaignVedio = require("../models/campaignVedio");
const StartCampaign = require("../models/startCampaign")
var path = require('path');

const filevedioFilter= (req,file,cb)=>{
  var campaignVedio = path.extname(file.originalname);
  if(campaignVedio !== '.mkv' && campaignVedio !== '.mp4' ) {
    {
      console.log("Error");
      cb(null, false)
      return cb(new Error('Only Vedios are allowed'))
   
    }
}
else{
  cb(null,true)
  console.log("vedio Uploaded");
}
} 

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ 
      storage: storage ,
      fileFilter:filevedioFilter
});


router.post('/uploadVedio',upload.single('mainVedio'),(req,res)=>{

  StartCampaign.findById(req.body.startCampaignId)
  .exec()
  .then(startCampaign => {
    if(!startCampaign){
      return res.status(404).json({
        message:"campaign NOt found"
      })
    }
     const campaignVedio = new CampaignVedio({
      mainVedio: req.file.path,
      startCampaign:req.body.startCampaignId,
    });
  
    return campaignVedio.save();
  }) .then(result => {
    res.send(result)
    res.status(201).json({
      message: "VEdio Uploded",
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
  CampaignVedio.find()
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(404).json({
        message: "No Vedio Uploaded"
      });
    }else{
      res.send(user)
    }
})
})
router.get('/:id',(req,res)=>{
  CampaignVedio.find({startCampaign:req.body.startCampaignId})
.exec()
.then(user =>{
  if (user.length < 1) {
    return res.status(404).json({
      message: "No Vedio Uploaded"
    });
  }else{
    res.send(user)
  }
})
})

  
  
module.exports = router;

  // router.post("/", chechAuth,upload.single("campaignVedio"), (req, res, next) => {
  //   const campaignVedio = new CampaignVedio({
  //     campaignVedio: req.file.path,
  
  //   });
  //   campaignVedio
  //     .save()
  //     .then(result => {
  //       console.log(result);
  //     })
  //     .catch(err => console.log(err));
  //   res.status(201).json({
  //     createdVedio: campaignVedio
  //   });
  // });
  
  
  // router.get("/", (req, res) => {
  //   CampaignVedio.find((err, doc) => {
  //     if (!err) {
  //       res.send(doc);
  //     } else {
  //       console.log(
  //         "Error in Retriving Students:" + JSON.stringify(err, undefined, 2)
  //       );
  //     }
  //   });
  // });
