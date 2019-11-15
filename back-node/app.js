const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//get env variables from .env file
dotenv.config();

// set up express app
const app = express();

// connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/M2WEB", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/', require('./src/routes'));

// error handling middleware
app.use(function(err, req, res, next){
  console.log(err);
  res.status(422).send({error: err.message});
});

// start server
app.listen(process.env.APP_PORT || 4000, function(){
  console.log(`now listening for requests on  http://127.0.0.1:${process.env.APP_PORT}`);
});



