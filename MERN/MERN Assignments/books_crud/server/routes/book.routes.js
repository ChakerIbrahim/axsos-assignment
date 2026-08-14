const BookController = require("../controllers/book.controller");

module.exports = (app) => {
  app.get("/api/health", (req, res) => {
    return res.json({ message: "backend is healthy" });
  });
  app.get("/api/books", BookController.findBooks);
  app.post("/api/books", BookController.createBook);
  app.get("/api/books/:id", BookController.getBookById);
  app.delete("/api/books/:id", BookController.deleteBook);
  app.put("/api/books/:id", BookController.updateBook);
};
