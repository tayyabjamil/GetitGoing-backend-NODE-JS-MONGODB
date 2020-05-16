const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();

const CampaignReview = require("../models/campaignReview")
const StartCampaign = require("../models/startCampaign")

router.post("/", async(req, res, next) => { 
  StartCampaign.findById(req.body.startCampaignId)
  .exec()
    .then(startCampaign => {
      if (!startCampaign) {
        return res.status(404).json({
          message: "Campagin not found"
        });
      }
      const campaignReview = new CampaignReview({
   
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        details: req.body.details,
        rating:req.body.rating,
        startCampaign:req.body.startCampaignId,
      });
      return campaignReview.save();
    })
    .then(result => {
      // res.send(result)
      res.status(201).send({result})
    })
   
});
router.get('/:id', async(req,res)=>{
  CampaignReview.find({startCampaign:req.params.id})
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(404).json({
        message: "No Review Posted"
      });
    }else{
      res.send(user)
    }
  
  }
  )
})
router.get('/',async(req,res)=>{
  CampaignReview.find()
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(404).json({
        message: "No Review Posted"
      });
    }else{
      res.send(user)
    }
  
  }
  )
})

  module.exports = router;
