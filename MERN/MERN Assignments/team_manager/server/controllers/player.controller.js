const Player = require("../models/player.model");

const findPlayers = async (req, res) => {
  try {
    const players = await Player.find();

    return res.json({ players });
  } catch (err) {
    console.log(err);
  }
};

const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    return res.json({ player });
  } catch (err) {
    console.log(err);

    return res.json({ player: null });
  }
};

const createPlayer = async (req, res) => {
  try {
    const body = req.body;

    const player = await Player.create(body);

    return res.json({ player });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ errors: err.errors });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const player = await Player.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true },
    );

    return res.json({ player });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ errors: err.errors });
  }
};

const deletePlayer = async (req, res) => {
  try {
    await Player.deleteOne({ _id: req.params.id });

    return res.json({
      success: true,
      message: `Player with id: ${req.params.id} was deleted`,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findPlayers,
  createPlayer,
  getPlayerById,
  deletePlayer,
  updatePlayer,
};
