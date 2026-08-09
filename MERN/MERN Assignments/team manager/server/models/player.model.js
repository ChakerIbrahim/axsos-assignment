const mongoose = require('mongoose');

/* -------------------------------------------------------------
   The blueprint for every player document.
   The validations live HERE, so the same rules apply on create
   and on update — one place, not two.
------------------------------------------------------------- */
const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        // the second item in the array is the message we get back
        required: [ true, "Player name is required" ],
        minlength: [ 3, "Player name must be at least 3 characters" ]
    },
    preferredPosition: {
        type: String,
        required: [ true, "Preferred position is required" ]
    },

    // one field per game in the series.
    // default means a brand new player is Undecided everywhere,
    // so the add form never has to ask about it.
    game1: { type: String, default: "Undecided" },
    game2: { type: String, default: "Undecided" },
    game3: { type: String, default: "Undecided" }

}, { timestamps: true });   // adds createdAt and updatedAt automatically

/* -------------------------------------------------------------
   The model is the constructor we use to talk to the collection.
   Mongoose lowercases and pluralises "Player", so the collection
   in MongoDB will be called "players".
------------------------------------------------------------- */
const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;