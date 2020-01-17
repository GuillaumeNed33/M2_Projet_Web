const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const path = require('path');

// get env variables from .env file
dotenv.config();

// set up express app
const app = express();

// connect to mongodb
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

app.use(express.static(path.join(__dirname, 'uploads')));

// use body-parser middleware
app.use(bodyParser.json());

// enable cors
app.use(cors())

// initialize routes
app.use('/', require('./src/routes'));

// error handling middleware
app.use(function(err, req, res, next){
  console.error(err);
  res.status(422).send({error: err.message});
});

// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, function(){
  console.log("now listening for requests on  http://127.0.0.1:" + PORT);
});



