const Author = require("../models/author.model");

const findAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    return res.json({ authors });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching authors" });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    return res.json({ author });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching author" });
  }
};

const createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    return res.status(201).json({ author });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    return res.json({ author });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const result = await Author.deleteOne({ _id: req.params.id });
    return res.json({
      success: true,
      message: `Author with id ${req.params.id} was deleted`,
      result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error deleting author" });
  }
};

module.exports = {
  findAuthors,
  createAuthor,
  getAuthorById,
  deleteAuthor,
  updateAuthor,
};