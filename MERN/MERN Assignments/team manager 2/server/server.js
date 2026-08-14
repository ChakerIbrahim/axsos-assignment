require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./config/mongoose.config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const PORT = process.env.PORT;

const AppRoutes = require("./routes/player.routes");

AppRoutes(app);

app.listen(PORT, ()=> {
  console.log("server is running");
});