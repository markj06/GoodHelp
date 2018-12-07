const express = require('express');
const mongoose = require("mongoose");
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const client = require('./routes/api/Client');
const service = require('./routes/api/Service');
const serviceprovider = require('./routes/api/ServiceProvider');
const user = require('./routes/api/User');
const app = express();
const PORT = process.env.PORT || 3001;



// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// -----------------Database configuration with Mongoose---------------
// -----------------Define local MongoDB URI---------------
// var databaseUri = 'mongodb://localhost/goodhelpApp';

// DB Config
const db = require('./config/keys').mongoURI;

//------------------------------------------------
if (process.env.MONGODB_URI) {
//THIS EXECUTES IF THIS IS BEING EXECUTED IN YOUR HEROKU APP
  mongoose.connect(process.env.MONGODB_URI);
} else {
//THIS EXECUTES IF THIS IS BEING EXECUTED ON YOUR LOCAL MACHINE
  mongoose.connect(databaseUri);
}
//-----------------End database configuration-------------------------


// var db = mongoose.connection;




// Define middleware here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// Use Routes
app.use('/api/client', client);
app.use('/api/service', service);
app.use('/api/serviceprovider', serviceprovider);
app.use('/api/user', user);



// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
})


//once logged in to the db through mongosse, log a success message
db.once('open', function() {
  console.log('Mongoose connection sucessful.');
})

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
