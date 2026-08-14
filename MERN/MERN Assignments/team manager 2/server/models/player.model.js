const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:[true,"Name are required"],
      min:[2, "Name must be at least 3 characters long"],
    },
    preferredPosition: {
      type:String,
    },
  },
  {timestamps:true}
);

const Player = mongoose.model("user", PlayerSchema);

module.exports = Player;