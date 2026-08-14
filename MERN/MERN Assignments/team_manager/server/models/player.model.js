const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Player name is required"],
      minlength: [3, "Name must be at least 3 characters in length"],
    },
    position: {
      type: String,
    },
    game1: {
      type: String,
      default: "Undecided",
    },
    game2: {
      type: String,
      default: "Undecided",
    },
    game3: {
      type: String,
      default: "Undecided",
    },
  },
  { timestamps: true },
);

const Player = mongoose.model("player", PlayerSchema);

module.exports = Player;
