const mongoose =  require('mongoose')

var  registerHallSchema = mongoose.Schema({
    userAccount: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "userAccount",
        required:true 
      },
    name: String,
    email:String,
    location:String,
    startBookingAmount:String,
    about:String,
    contact:String,
    mainImage:String,
    vedio:String,
    services : [ 
           
             ],
            
    mainImage:String,
//     gallary : [ {
//    gallary:String
//     } ]
    
})
module.exports = mongoose.model('registerHall',registerHallSchema)