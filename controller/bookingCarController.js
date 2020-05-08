const mongoose = require('mongoose')
const express = require ('express')
var router =express.Router();
const BookingCar = require("../models/bookingCar")
const RegisterCar = require("../models/registerCar")

router.post("/", async(req, res, next) => { 
  RegisterCar.findById(req.body.registerCarId)
  .exec()
    .then(registerCar => {
      if (!registerCar) {
        return res.status(404).json({
          message: "CAr not found"
        });
      }
      const bookingCar = new BookingCar({
   
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        date:req.body.date,
      city:req.body.city,
        registerCar:req.body.registerCarId,
      });
      return bookingCar.save();
    })
    .then(result => {
    
        res.status(201).send({result})
      });
    })
    router.get('/:id', async(req,res)=>{
      BookingCar.find({registerCar:req.params.id})
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(404).json({
            message: "No Booking "
          });
        }else{
          res.send(user)
        }
      
      }
      )
    })

router.get("/", (req, res) => {
    BookingCar.find((err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in Retriving Booking Data:" + JSON.stringify(err, undefined, 2)
        );
      }
    });  
  });
module.exports=router;
