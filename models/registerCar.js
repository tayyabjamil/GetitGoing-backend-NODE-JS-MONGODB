const mongoose =  require('mongoose')

var  registerCarSchema = mongoose.Schema({
    userAccount: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "userAccount",
        required:true 
      },
    name: String,
    amount:String,
    location:String,
    about:String,
    contact:String,
    date:String,
    mainImage:String,
    multipleImages:[],
//     gallary : [ {
//    gallary:String
//     } ]
    
})
module.exports = mongoose.model('registerCar',registerCarSchema)