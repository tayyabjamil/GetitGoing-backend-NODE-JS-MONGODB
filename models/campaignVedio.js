const mongoose = require("mongoose")

 var campaignVedioSchema = mongoose.Schema({
  mainVedio:String,
 
  startCampaign:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'startCampaign',
    required:true
},

})
module.exports = mongoose.model('campaignVedio',campaignVedioSchema);