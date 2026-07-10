package com.chaker.bookclub.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.chaker.bookclub.models.Book;
import com.chaker.bookclub.models.User;
import com.chaker.bookclub.services.BookService;
import com.chaker.bookclub.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

// Controller for everything related to books
@Controller
public class BookController {

    // This controller needs BOTH services:
    // BookService for the books, UserService to fetch the logged-in user
    @Autowired
    private BookService bookServ;

    @Autowired
    private UserService userServ;

    // GET /books : displays all books from the database.
    // This is the page logged-in users are redirected to.
    @GetMapping("/books")
    public String books(HttpSession session, Model model) {

        // Guard: only logged-in users can see this page
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // Fetch the logged-in user (to greet them: "Welcome, Astrid")
        Long userId = (Long) session.getAttribute("userId");
        model.addAttribute("user", userServ.findUserById(userId));

        // All the books from everyone's shelves
        model.addAttribute("books", bookServ.allBooks());

        return "books.jsp";
    }

    // GET /books/new : the "Add a Book to Your Shelf!" form
    @GetMapping("/books/new")
    public String newBook(@ModelAttribute("book") Book book, HttpSession session) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        return "newBook.jsp";
    }

    // POST /books : receives the submitted form and creates the book
    @PostMapping("/books")
    public String createBook(@Valid @ModelAttribute("book") Book book,
            BindingResult result, HttpSession session) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // If validations failed (title/author/thoughts blank),
        // re-render the form with the messages
        if (result.hasErrors()) {
            return "newBook.jsp";
        }

        // Attach the logged-in user as the poster of this book.
        // This is the one-to-many link: the book's user_id foreign key
        // will point at the user whose ID is stored in session.
        Long userId = (Long) session.getAttribute("userId");
        User user = userServ.findUserById(userId);
        book.setUser(user);

        bookServ.createBook(book);
        return "redirect:/books";
    }

    // GET /books/{id} : the book's details page.
    // The book title on the Books page links here.
    @GetMapping("/books/{id}")
    public String showBook(@PathVariable("id") Long id,
            HttpSession session, Model model) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // The book to display
        model.addAttribute("book", bookServ.findBook(id));

        // Pass the logged-in user's id so the JSP can decide:
        // SENSEI BONUS - if the book was posted by the logged-in user,
        // say "You read ..." / "Here are your thoughts"
        // NINJA BONUS - show the edit link + delete button only to the poster
        model.addAttribute("userId", session.getAttribute("userId"));

        return "showBook.jsp";
    }

    // NINJA BONUS PAGE
    // GET /books/{id}/edit : the "Change your Entry" page,
    // pre-populated with the existing values for the book
    @GetMapping("/books/{id}/edit")
    public String editBook(@PathVariable("id") Long id,
            HttpSession session, Model model) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        Book book = bookServ.findBook(id);

        // Guard: only the person who posted this book can edit it.
        // Anyone else gets sent back to the books page.
        Long userId = (Long) session.getAttribute("userId");
        if (!book.getUser().getId().equals(userId)) {
            return "redirect:/books";
        }

        // Passing the existing book pre-populates the form
        // (data binding fills the inputs with the book's current values)
        model.addAttribute("book", book);
        return "editBook.jsp";
    }

    // PUT /books/{id} : receives the edit form and updates the book.
    // Validations: same as for create.
    @PutMapping("/books/{id}")
    public String updateBook(@PathVariable("id") Long id,
            @Valid @ModelAttribute("book") Book book,
            BindingResult result, HttpSession session) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // If validations failed, re-render the edit page
        // (the form keeps the submitted values + shows the messages)
        if (result.hasErrors()) {
            return "editBook.jsp";
        }

        // Make sure the book keeps its id (so save() UPDATEs, not INSERTs)
        // and keeps its original poster
        book.setId(id);
        Long userId = (Long) session.getAttribute("userId");
        book.setUser(userServ.findUserById(userId));

        bookServ.updateBook(book);
        return "redirect:/books";
    }

    // NINJA BONUS
    // DELETE /books/{id} : the delete button should delete the book
    // and redirect to the books page
    @DeleteMapping("/books/{id}")
    public String deleteBook(@PathVariable("id") Long id, HttpSession session) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // Guard: only the person who posted this book can delete it
        Book book = bookServ.findBook(id);
        Long userId = (Long) session.getAttribute("userId");
        if (book.getUser().getId().equals(userId)) {
            bookServ.deleteBook(id);
        }

        return "redirect:/books";
    }
}
