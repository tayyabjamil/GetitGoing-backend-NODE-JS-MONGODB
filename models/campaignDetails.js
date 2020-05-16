const mongoose = require("mongoose");

var campaignDetailsSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  startCampaign: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "startCampaign",
    required:true 
  },
  campaignImages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campaignImage"
      }
    ],
    campaignVedios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campaignVedio"
      }
    ],
    campaignUpdates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campaignUpdate"
      }
    ],
    campaignStories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campaignStory"
      }
    ],
    campaignBackers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campaignBacker"
      }
    ],
  
  
});
module.exports = mongoose.model("campaignDetails", startCampaignSchema);