const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/CRUD',(err)=>{
  
//     if(!err)
//     {
//     {useNewUrlParser: true}

//     console.log("MongoDb connection succedded");
//     }
//     else
//     console.log('error in DB connection:'+JSON.stringify(err,undefined,2));
// });
     
const dbpath = "mongodb://localhost:27017/CRUD";

const mongo = mongoose.connect(dbpath, {useNewUrlParser: true });
mongo.then(() => {
console.log('Database connected');

}).catch((err) => {
console.log('err', err);
});
module.exports=mongoose;