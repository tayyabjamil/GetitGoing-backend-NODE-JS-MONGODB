const mongoose =  require('mongoose')

var  registerHallSchema = mongoose.Schema({
    name: String,
    email:String,
    location:String,
    startBookingAmount:String,
    about:String,
    contact:String,
    services : [ 
           
             ],
    mainImage:String,
//     gallary : [ {
//    gallary:String
//     } ]
    
})
module.exports = mongoose.model('registerHall',registerHallSchema)