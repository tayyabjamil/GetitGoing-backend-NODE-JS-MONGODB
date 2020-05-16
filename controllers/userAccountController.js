const express = require("express");
var router = express.Router();
var  userAccount  = require("../models/userAccount");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

router.post("/signUp", (req, res) => {
  userAccount
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "mail already exist"
        });
      } else {
   
            var userData = new userAccount({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              password:req.body.password
        
            });
            userData.save((error, userData) => {
              if (error) {
                console.log(error);
              } else {
                res.status(200);
              console.log('Sign up');
              }
            });
           
          }
        });
      })
   

router.post("/createAccount", (req, res) => {
  userAccount
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "mail already exist"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            var userData = new userAccount({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              password: hash
            });
            userData.save((error, userData) => {
              if (error) {
                console.log(error);
              } else {
                let payload = { subject: userData._id };
                let token = jwt.sign(payload, "secretKey");

                res.status(200).send({ token });
              }
            });
           
          }
        });
      }
    });
});


router.post("/loginApp", (req, res) => {
  userAccount
  .find({email:req.body.email})

  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(404).json({
        message: "user not found"
      });
    } else {
    
  console.log('login');
  userId = user[0].id;
  res.status(200).send({  userId });
}
  })
})
router.post("/login", (req, res, next) => {
  userAccount.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
   
                userId = user[0].id;
                email = user[0].email;
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          let payload = { subject: result };
            let token = jwt.sign(payload, "secretKey");
            res.status(200).send({ token, userId ,email });
        
        }else{
        res.status(401).json({
          message: "Auth failed"
        });
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        
      });
    });
});
// router.post("/login", (req, res) => {
//   userAccount
//     .find({email:req.body.email})

//     .exec()
//     .then(user => {
//       if (user.length < 1) {
//         return res.status(404).json({
//           message: "user not found"
//         });
//       } else {
//         userId = user[0].id;
//         email = user[0].email;
//         bcyrpt.compare(req.body.password, user[0].password, (err, result) => {
//           if (err) {
//             return res.status(401).json({
//               message: "password uathentication failed"
//             });
//           } else {
//             let payload = { subject: result };
//             let token = jwt.sign(payload, "secretKey");
//             res.status(200).send({ token, userId ,email });
//           }
//         });
//       }
//     });
// });
router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("NO record with given id : ${req.params.id}");
  userAccount.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
      console.log(doc);
    } else {
      console.log(
        "Error in Retriving Useraccounts:" + JSON.stringify(err, undefined, 2)
      );
    }
  }).populate('startCampaigns ')
});
router.get("/", (req, res) => {
  userAccount.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving userAccounts:" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});




// router.post('/',(req,res,next)=>{
//   const startCampaigns = new StartCampaign({
//     useraccount:req.body.userAccountId,
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.amount,
    
//   })

//   startCampaign.save()
//   .exec()
//   .then(result=>{
//     console.log(result)
//     res.status(201).json(result)
//   })
//   .catch(
//     console.log(err)
//   )
// })

// router.post("/:userAccountId/startcampaigns", uploadImage.single('mainImage'),async (req, res) => {
//   //find User Account
//   const useraccount = await userAccount.findOne({ _id: req.params.userAccountId});

//   // // // Start new Campaign
//   const startCampaign = new StartCampaign();

//   startCampaign.title = req.body.title,
//     startCampaign.tagline = req.body.tagline,
//     // startCampaign.image= req.file.path,
//     startCampaign.amount = req.body.amount,
//     startCampaign.description = req.body.description;
//     startCampaign.pledgeAmount = req.body.pledgeAmount,
//     startCampaign.rewardDetails = req.body.rewardDetails;
//     startCampaign.mainImage = req.file.filename;
    

//   startCampaign.useraccount = useraccount._id;
//   await startCampaign.save();

//   // // //associate userAccount with course
//   useraccount.startCampaigns.push(startCampaign._id);
//   await useraccount.save();

//   res.send(startCampaign);
// });
// router.post("/:userAccountId/backcampaigns", async (req, res) => {
//   //find User Account
//   const useraccount = await userAccount.findOne({
//     _id: req.params.userAccountId
//   });

//   // // // Start new Campaign
//   const backCampaign = new BackCampaign();

//   (backCampaign.name = req.body.name),
//     (backCampaign.reward = req.body.reward),
//     // backCampaign.image= req.file.path,
//     (backCampaign.investment = req.body.investment),
//     (backCampaign.useraccount = useraccount._id);
//   await backCampaign.save();

//   // // //associate userAccount with course
//   useraccount.backCampaigns.push(backCampaign._id);
//   await useraccount.save();

//   res.send(backCampaign);
// });

module.exports = router;