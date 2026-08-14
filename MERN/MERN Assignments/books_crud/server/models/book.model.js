const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      minlength: [3, "Author must be at least 3 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      maxlength: [200, "Description cannot be longer than 200 characters"],
    },
  },
  { timestamps: true },
);

const Book = mongoose.model("book", BookSchema);

module.exports = Book;