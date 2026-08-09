const express = require('express');
const cors = require('cors');
const app = express();

// load the .env file so process.env has our variables
require('dotenv').config();
const port = process.env.PORT;

// running this file connects us to the database
require('./config/mongoose.config');

// lets the React app on a different port talk to us
app.use(cors());

// middleware that fills in req.body.
// MUST come before the routes, or req.body will be undefined.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import the routes file and immediately call it with our app
require('./routes/player.routes')(app);

app.listen(port, () => console.log(`Server running on port ${port}`));