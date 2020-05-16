const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();

const Invest = require("../models/invest")
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
        const invest = new Invest({
     
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          pledgeAmount: req.body.pledgeAmount,
          startCampaign:req.body.startCampaignId
        });
        return invest.save();
      })
      .then(result => {
        // res.send(result)
        res.status(201).send({result})
      })
     
  }); 
  router.get('/:id', async(req,res)=>{
    Invest.find({startCampaign:req.params.id})
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "No Investment by this acount "
        });
      }else{
        res.send(user)
      }
    
    }
    )
  })
  module.exports = router;
