require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

mongoose
    .connect(uri)
    .then(() => console.log("connected to db"))
    .catch(error => console.log("error connecting to db:", error));