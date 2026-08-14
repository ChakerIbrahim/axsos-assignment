const Author = require("../models/author.model");

const findAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ name: 1 });

    return res.json({ authors });
  } catch (err) {
    console.log(err);
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    return res.json({ author });
  } catch (err) {
    console.log(err);

    return res.json({ author: null });
  }
};

const createAuthor = async (req, res) => {
  try {
    const body = req.body;

    const author = await Author.create(body);

    return res.json({ author });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ errors: err.errors });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const author = await Author.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true },
    );

    return res.json({ author });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ errors: err.errors });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    await Author.deleteOne({ _id: req.params.id });

    return res.json({
      success: true,
      message: `Author with id: ${req.params.id} was deleted`,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findAuthors,
  createAuthor,
  getAuthorById,
  deleteAuthor,
  updateAuthor,
};
