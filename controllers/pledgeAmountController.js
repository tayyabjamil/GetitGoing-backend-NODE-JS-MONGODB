// const express = require("express");
// const mongoose = require("mongoose");
// var router = express.Router();

// const PledgeAmoount = require("../models/pledgeAmount")
// const StartCampaign = require("../models/startCampaign")

// router.post("/", async(req, res, next) => { 
//   StartCampaign.findById(req.body.startCampaignId)
//   .exec()
//     .then(startCampaign => {
//       if (!startCampaign) {
//         return res.status(404).json({
//           message: "No amount Invested"
//         });
//       }
//       const pledgeAmount = new PledgeAmount({
   
//         _id: new mongoose.Types.ObjectId(),
//         amount: req.body.amount,
      
//         startCampaign:req.body.startCampaignId,
//       });
//       return pledgeAmount.save();
//     })
//     .then(result => {
//       // res.send(result)
//       res.status(201).send({result})
//     })
   
// });
// router.get('/:id', async(req,res)=>{
//   PledgeAmount.find({startCampaign:req.params.id})
//   .exec()
//   .then(user => {
//     if (user.length < 1) {
//       return res.status(404).json({
//         message: "No Amount "
//       });
//     }else{
//       res.send(user)
//     }
  
//   }
//   )
// })
// router.get('/',async(req,res)=>{
//   PledgeAmount.find()
//   .exec()
//   .then(user => {
//     if (user.length < 1) {
//       return res.status(404).json({
//         message: "No Amount Invested"
//       });
//     }else{
//       res.send(user)
//     }
  
//   }
//   )
// })

//   module.exports = router;
