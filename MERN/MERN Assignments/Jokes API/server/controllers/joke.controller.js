const Joke = require("../models/jokes.module");
module.exports.createJoke = async (req, res) => {
  try {
    const newJoke = await Joke.create(req.body);
    return res.json({ joke: newJoke });
    console.log("creating was sucessfully");
  } catch (err) {
    return res.json(err);
    console.log("error", err);
  }
};

module.exports.updateJoke = async (req, res) => {
  try {
    const newJoke = await Joke.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!newJoke) {
      return res.json({ message: "Joke Not Found!" });
    }

    return res.json({ joke: newJoke });
  } catch (err) {
    return res.json(err);
  }
};

module.exports.getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.find();
    return res.json({ jokes: jokes });
  } catch (err) {
    return res.json(err);
  }
};

module.exports.getJokeById = async (req, res) => {
  try {
    const joke = await Joke.findById(req.params.id);
    if (!joke) {
      return res.json({ message: "Joke Not Found" });
    }

    return res.json({ joke });
  } catch (err) {
    return res.json(err);
  }
};

module.exports.deleteJoke = async (req, res) => {
  try {
    const deleteJoke = await Joke.findByIdAndDelete(req.params.id);

    if (!deleteJoke) {
      return res.json({ message: "Joke not found" });
    }

    return res.json({ message: "Joke deleted sucessfully" });
  } catch (err) {
    return res.json(err);
  }
};
