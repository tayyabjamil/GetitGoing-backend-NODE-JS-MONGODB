const mongoose = require("mongoose")

 var campaignReviewSchema = mongoose.Schema({
  
  name:String,
  details:String,
  rating:String,
  startCampaign:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'startCampaign',
    required:true 
},

})
module.exports = mongoose.model('campaignReview',campaignReviewSchema);