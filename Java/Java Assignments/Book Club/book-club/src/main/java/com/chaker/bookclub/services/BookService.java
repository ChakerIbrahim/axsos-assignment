package com.chaker.bookclub.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chaker.bookclub.models.Book;
import com.chaker.bookclub.repositories.BookRepository;

// Service layer for Book: holds the CRUD logic
// (controller -> service -> repository -> database)
@Service
public class BookService {

    // @Autowired injects the repository, so we omit the constructor
    @Autowired
    private BookRepository bookRepo;

    // Returns all books (for the Books table page)
    public List<Book> allBooks() {
        return bookRepo.findAll();
    }

    // Creates (saves) a new book. The book already has its user
    // (the poster) attached thanks to data binding / the controller.
    public Book createBook(Book book) {
        return bookRepo.save(book);
    }

    // Finds one book by its id, or returns null if it does not exist
    public Book findBook(Long id) {
        Optional<Book> optionalBook = bookRepo.findById(id);
        if (optionalBook.isPresent()) {
            return optionalBook.get();
        } else {
            return null;
        }
    }

    // Updates an existing book.
    // The repository uses the SAME save method for both creation and
    // updates - because this book already has an id, save() performs
    // an UPDATE instead of an INSERT.
    public Book updateBook(Book book) {
        return bookRepo.save(book);
    }

    // Deletes a book by its id
    public void deleteBook(Long id) {
        bookRepo.deleteById(id);
    }
}
