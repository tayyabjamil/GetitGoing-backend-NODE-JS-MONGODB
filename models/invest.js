const mongoose = require("mongoose")

 var investSchema = mongoose.Schema({
  name:String,
  pledgeAmount:String,
  startCampaign:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'startCampaign',
    required:true
},

})
module.exports = mongoose.model('invest',investSchema);