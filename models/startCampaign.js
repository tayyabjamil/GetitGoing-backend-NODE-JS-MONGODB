const mongoose = require("mongoose");

var startCampaignSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  tagline: String,
  amount: String,

  description: String,
  pledgeAmount1: String,
  pledgeAmount2: String,
  pledgeAmount3: String,
  rewardDetails1: String,
  rewardDetails2: String,
  rewardDetails3: String,
  type: String,
  mainImage: String,
  vedio: String,
  multipleImages: [],
  // rewardImages:String,
  userAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userAccount",
    required: true,
  },
});
module.exports = mongoose.model("startCampaign", startCampaignSchema);
//
