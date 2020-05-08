//npm init
const express = require('express');
var cors = require('cors');
var bookingController = require('./controller/bookingController')

var userAccountController = require('./controller/userAccountController');
var registerHallController = require('./controller/registerHallController');
var registerCarController = require('./controller/registerCarController');
var bookingCarController = require('./controller/bookingCarController');
const app = express();




const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cors());
app.use(express.static('uploads'));


app.use('/userAccount', userAccountController);
app.use('/booking',bookingController)
app.use('/registerHall',registerHallController)
app.use('/registerCar',registerCarController)
app.use('/bookingCar',bookingCarController)
module.exports=app;
