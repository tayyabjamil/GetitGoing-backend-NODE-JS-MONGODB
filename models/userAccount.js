const mongoose = require('mongoose');

var userAccountSchema = mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
   userId :{type: String},
    username:  { type: String},
    email:     { type:String},
    password:  { type:String},
    
})

module.exports = mongoose.model("userAccount", userAccountSchema);
