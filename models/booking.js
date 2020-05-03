const mongoose =  require('mongoose')

var  bookingSchema = mongoose.Schema({
  
   name: String,
   email:String,
   phone:String,
   guests:String,
   date:String,
   eventType:String,
 
   registerHall:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'registerHall',
    required:true 
},
})
module.exports = mongoose.model('booking',bookingSchema)