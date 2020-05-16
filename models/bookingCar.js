const mongoose =  require('mongoose')

var  bookingCarSchema = mongoose.Schema({
  
   name: String,
   email:String,
   phone:String,
 
   date:String,
 
 
   registerCar:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'registerCar',
 
},
})
module.exports = mongoose.model('bookingCar',bookingCarSchema)