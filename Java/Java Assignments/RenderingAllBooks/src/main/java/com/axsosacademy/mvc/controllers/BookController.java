package com.axsosacademy.mvc.controllers;

import com.axsosacademy.mvc.models.Book;
import com.axsosacademy.mvc.services.BookService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class BookController {
	private final BookService bookService;
	
	public BookController(BookService bookService) {
		this.bookService = bookService;
	}
	
	 @GetMapping("/books")
	    public String index(Model model) {
	        List<Book> books = bookService.AllBooks();
	        model.addAttribute("books", books);
	        return "books/index";
	    }
	
	@GetMapping("/books/{id}")
	public String show(@PathVariable("id") Long id, Model model) {
		Book book = bookService.getBook(id);
		model.addAttribute("book", book);
		return "show";
	}
}
