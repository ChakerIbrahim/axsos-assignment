// import the model we exported from the models folder.
// note: no require("mongoose") here — the model handles that.
const Author = require('../models/author.model');

// GET all authors
module.exports.findAllAuthors = (req, res) => {
    Author.find()
        .then(allAuthors => res.json(allAuthors))
        .catch(err => res.status(400).json(err));
};

// GET one author by id
module.exports.findOneAuthor = (req, res) => {
    Author.findOne({ _id: req.params.id })
        .then(oneAuthor => {
            // findOne gives back null when nothing matches,
            // so we turn that into a proper 404 for the client
            if (oneAuthor === null) {
                res.status(404).json({ message: "Author not found" });
            } else {
                res.json(oneAuthor);
            }
        })
        // a badly formatted id throws instead of returning null,
        // so this catch handles that case too
        .catch(err => res.status(404).json({ message: "Author not found" }));
};

// POST a new author
module.exports.createAuthor = (req, res) => {
    // req.body is the JSON the client sent us
    Author.create(req.body)
        .then(newAuthor => res.json(newAuthor))
        // 400 is what makes axios run .catch on the client
        .catch(err => res.status(400).json(err));
};

// PATCH an existing author
module.exports.updateAuthor = (req, res) => {
    Author.findOneAndUpdate(
        { _id: req.params.id },              // which document
        req.body,                            // what to change it to
        { new: true, runValidators: true }   // return the NEW version, and re-check the rules
    )
        .then(updatedAuthor => res.json(updatedAuthor))
        .catch(err => res.status(400).json(err));
};

// DELETE an author
module.exports.deleteAuthor = (req, res) => {
    Author.deleteOne({ _id: req.params.id })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};