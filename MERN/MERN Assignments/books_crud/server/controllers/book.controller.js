const Book = require("../models/book.model");

const findBooks = async (req, res) => {
  try {
    const books = await Book.find();

    return res.json({ books });
  } catch (err) {
    console.log(err);
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    return res.json({ book });
  } catch (err) {
    console.log(err);
  }
};

const createBook = async (req, res) => {
  try {
    const body = req.body;

    const book = await Book.create(body);

    return res.json({ book });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ errors: err.errors });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true },
    );

    return res.json({ book });
  } catch (err) {
    console.log(err);

    return res.status(400).json({ errors: err.errors });
  }
};

const deleteBook = async (req, res) => {
  try {
    await Book.deleteOne({ _id: req.params.id });

    return res.json({
      success: true,
      message: `Book with id: ${req.params.id} was deleted`,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findBooks,
  createBook,
  getBookById,
  deleteBook,
  updateBook,
};