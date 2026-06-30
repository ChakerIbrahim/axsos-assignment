package services;
import org.springframework.stereotype.Service;
import com.axsosacademy.mvc.models.Book;

public class BookService {
	private final BookRepository bookRepository;
	
	public BookService(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}
	
	public List<book> allBooks() {
		return bookRepository.findAll();
		
	}
	public Book createBook(Book b) {
		return bookRepository.save(b);
	}
	public Book findBook(Long id) {
		Optional<Book> optionalBook = bookRepository.findByID(id);
		if(optionalBook.isPresent()) {
			return optionalBook.get();
		} else {
			return null;
		}
	}
}
