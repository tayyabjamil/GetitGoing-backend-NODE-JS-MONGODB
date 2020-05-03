const mongoose = require('mongoose')
const express = require ('express')
var router =express.Router();
const Booking = require("../models/booking")
const RegisterHall = require("../models/registerHall")

router.post("/", async(req, res, next) => { 
  RegisterHall.findById(req.body.registerHallId)
  .exec()
    .then(registerHall => {
      if (!registerHall) {
        return res.status(404).json({
          message: "Hall not found"
        });
      }
      const booking = new Booking({
   
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        guests:req.body.guests,
        date:req.body.date,
        eventType:req.body.eventType,
      city:req.body.city,
        registerHall:req.body.registerHallId,
      });
      return booking.save();
    })
    .then(result => {
    
        res.status(201).send({result})
      });
    })
    router.get('/:id', async(req,res)=>{
      Booking.find({registerHall:req.params.id})
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

// router.post('/',(req,res)=>{
// var bookingData = new Booking({
//     date:req.body.date,
//     timing: req.body.timing,
//     name:req.body.name,
//     guests:req.body.guests,
//     eventType:req.body.eventType,
//     phone:req.body.phone,
//   })
// bookingData.
// save((error, bookingData) => {
//   if (error) {
//     console.log(error);
//   } else {
//     res.status(200).send({bookingData});

//   }
// });

// })

router.get("/", (req, res) => {
    Booking.find((err, doc) => {
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
