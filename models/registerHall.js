const mongoose =  require('mongoose')

var  registerHallSchema = mongoose.Schema({
    userAccount: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "userAccount",
     
      },
    name: String,
    email:String,
    location:String,
    startBookingAmount:String,
    about:String,
    contact:String,
    mainImage:String,

    multipleImages:[],
    services : [ 
           
             ],
            
    mainImage:String,
    gallary : []
    
})
module.exports = mongoose.model('registerHall',registerHallSchema)