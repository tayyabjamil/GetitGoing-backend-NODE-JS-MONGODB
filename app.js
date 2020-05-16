const express = require('express');
const app=express();
var cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser')







var userAccountConroller = require('./controllers/userAccountController');

var startCampaignConroller = require('./controllers/startCampaignController');

var campaignImageConroller = require('./controllers/campaignImageController');
var campaignVedioConroller = require('./controllers/campaignVedioController');



var campaignStoryController = require('./controllers/campaginStoryController');
var campaignReviewContoller = require('./controllers/campaignReviewController')
var investController = require('./controllers/investController')
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// app.use((req,res,next)=>{
//         res.status(200).json({
//             message:"it works"
//         })
// })
// app.get('/products', (req, res, next) => {
//     res.json({msg: 'This is CORS-enabled for all origins!'})
//   })
  

   

app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use('/userAccount', userAccountConroller);

app.use('/startCampaign', startCampaignConroller );
app.use('/campaignImage', campaignImageConroller );

app.use('/campaignVedio', campaignVedioConroller );


app.use('/invest', investController );
app.use('/campaignStory', campaignStoryController );

app.use('/campaignReview',campaignReviewContoller)

module.exports = app;