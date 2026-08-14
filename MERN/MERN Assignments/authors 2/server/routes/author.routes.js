const AuthorController = require("../controllers/author.controller");

module.exports = (app) => {
  app.get("/api/health", (req, res) => {
    return res.json({ message: "backend is healthy" });
  });

  app.get("/api/authors", AuthorController.findAuthors);
  app.post("/api/authors", AuthorController.createAuthor);
  app.get("/api/authors/:id", AuthorController.getAuthorById);
  app.put("/api/authors/:id", AuthorController.updateAuthor);
  app.delete("/api/authors/:id", AuthorController.deleteAuthor);
};