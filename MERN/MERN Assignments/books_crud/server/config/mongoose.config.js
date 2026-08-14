require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGOOSE_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });