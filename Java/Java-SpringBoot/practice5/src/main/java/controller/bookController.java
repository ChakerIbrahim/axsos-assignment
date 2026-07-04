package controller;

import java.awt.print.Book;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
public class bookController {
	
}

@PostMapping("/books")
public String create(
		@RequestParam("title") String title,
		@RequestParam("description") String description,
		@RequestParam("language") String language,
		@RequestParam("pages") Integer pages)
{
	Book book = new Book(title, description , language, pages);
	bookService.createBook(book);
	return "redirect:/dashboard";
	
}

@GetMapping("/books/new")
public String newBook() {
	
	return "new.jsp";
}



@GetMapping("/books/new")
public String newBook(@ModelAttribute("book") Book book) {
	return "new.jsp";
}

@PostMpping("/books")
public String create (
		@Valid @ModelAttribute("book") Book book,
		BindingResult result)

		)
{
	bookService.createBook(book);
	
	return "redirect:/books";
	
}

@Controller
public class BooksController {
	
	
	@GetMapping("/books/new")
	public String newBook(@ModelAttribute("book") Book book) {
		return "new.jsp";
		
	}
	@PostMapping("/books")
	public String create(@Valid @ModelAttribute("book") Book book, BindingResult result) {
		if(result.hasError()) {
			return "new.jsp";
		}else {
			bookService.createBook(book);
			return "redirect:/books";
		}
	}
	
}

@Controller
public class bookController{
	@RequestMapping("/books/{id}/edit")
	public String edit(@PathVariable("id") Long id, Model model) {
		Book book = bookService.findBook(id);
		model.addAttribute("book", book);
		return "edit.jsp";
	}
	
	@RequestMapping(value="/books/{id}", method=RequestMethod.PUT)
	public String update(@Valid @ModelAttribute("book") Book book, BindingResult result, Model model) {
		if(result.hasErrors()) {
			model.addAttribute("book", book);
			return "edit.jsp";
		}else {
			bookService.updateBook(book);
			return "redirect:/books";
		}
	}
}



@Controller
public class BooksController {
	@RequestMapping(value="/books/{id}", method=RequestMethod.DELETE)
	public String destroy(@PathVariable("id") Long id) {
		bookService.deleteBook(id);
		return "redirect:/books";
	}
}