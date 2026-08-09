// import the model. no require("mongoose") — the model handles that.
const Player = require('../models/player.model');

// GET all players
module.exports.findAllPlayers = (req, res) => {
    Player.find()
        .then(allPlayers => res.json(allPlayers))
        .catch(err => res.status(400).json(err));
};

// GET one player by id
module.exports.findOnePlayer = (req, res) => {
    Player.findOne({ _id: req.params.id })
        .then(onePlayer => res.json(onePlayer))
        .catch(err => res.status(400).json(err));
};

// POST a new player
module.exports.createPlayer = (req, res) => {
    // req.body is the JSON the client sent us
    Player.create(req.body)
        .then(newPlayer => res.json(newPlayer))
        // 400 is what makes axios run .catch on the client
        .catch(err => res.status(400).json(err));
};

// PATCH an existing player — used for status changes too
module.exports.updatePlayer = (req, res) => {
    Player.findOneAndUpdate(
        { _id: req.params.id },              // which document
        req.body,                            // what to change
        { new: true, runValidators: true }   // return the NEW version, re-check the rules
    )
        .then(updatedPlayer => res.json(updatedPlayer))
        .catch(err => res.status(400).json(err));
};

// DELETE a player
module.exports.deletePlayer = (req, res) => {
    Player.deleteOne({ _id: req.params.id })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};