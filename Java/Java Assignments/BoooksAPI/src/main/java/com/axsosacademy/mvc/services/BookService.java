package com.axsosacademy.mvc.services;

import com.axsosacademy.mvc.models.Book;
import com.axsosacademy.mvc.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return (List<Book>) bookRepository.findAll();
    }

    public Book getBook(Long id) {
        Book book = bookRepository.findById(id).get();
        return book;
    }

    public Book createBook(String title, String description, String language, Integer numberOfPages) {
        Book book = new Book(title, description, language, numberOfPages);
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, String title, String description, String language, Integer numberOfPages) {
        Book book = getBook(id);

        book.setTitle(title);
        book.setDescription(description);
        book.setLanguage(language);
        book.setNumberOfPages(numberOfPages);

        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        boolean exists = bookRepository.existsById(id);

        if (exists) {
            bookRepository.deleteById(id);
        }
    }
}