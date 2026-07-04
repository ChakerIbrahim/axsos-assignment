package com.axsosacademy.mvc.repositories;

import com.axsosacademy.mvc.models.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Long> {
	
}
