package com.axsosacademy.mvc.controllers;

import com.axsosacademy.mvc.models.Book;
import com.axsosacademy.mvc.services.BookService;
import org.springframework.web.bind.annotation.*;

@RestController
public class BooksApi {

    private final BookService bookService;

    public BooksApi(BookService bookService) {
        this.bookService = bookService;
    }

    @RequestMapping(value = "/api/books/{id}", method = RequestMethod.GET)
    public Book show(@PathVariable("id") Long id) {
        return bookService.getBook(id);
    }

    @RequestMapping(value = "/api/books", method = RequestMethod.POST)
    public Book create(
            @RequestParam(value = "title") String title,
            @RequestParam(value = "description") String desc,
            @RequestParam(value = "language") String lang,
            @RequestParam(value = "pages") Integer numberOfPages) {
        return bookService.createBook(title, desc, lang, numberOfPages);
    }

    @RequestMapping(value = "/api/books/{id}", method = RequestMethod.PUT)
    public Book update(
            @PathVariable("id") Long id,
            @RequestParam(value = "title") String title,
            @RequestParam(value = "description") String desc,
            @RequestParam(value = "language") String lang,
            @RequestParam(value = "pages") Integer numberOfPages) {
        return bookService.updateBook(id, title, desc, lang, numberOfPages);
    }

    @DeleteMapping("/api/books/{id}")
    public void destroy(@PathVariable("id") Long id) {
        bookService.deleteBook(id);
    }
}