const mongoose = require("mongoose")

 var campaignStorySchema = mongoose.Schema({
  
  // storyImage:String,
  details:String,  
  startCampaign:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'startCampaign',
    required:true
},

})
module.exports = mongoose.model('campaignStory',campaignStorySchema);