// import everything the controller exported
const AuthorController = require('../controllers/author.controller');

// export a function that takes the express app and attaches routes to it
module.exports = (app) => {
    app.get('/api/authors', AuthorController.findAllAuthors);
    app.get('/api/authors/:id', AuthorController.findOneAuthor);
    app.post('/api/authors', AuthorController.createAuthor);
    app.patch('/api/authors/:id', AuthorController.updateAuthor);
    app.delete('/api/authors/:id', AuthorController.deleteAuthor);
};