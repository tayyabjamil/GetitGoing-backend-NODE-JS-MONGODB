const mongoose = require("mongoose")

 var campaignImageSchema = mongoose.Schema({
  mainImage:String,  

  startCampaign:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'startCampaign',
    required:true
},

})
module.exports = mongoose.model('campaignImage',campaignImageSchema);