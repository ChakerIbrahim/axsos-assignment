package com.chaker.bookclub.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.chaker.bookclub.models.Book;

// Repository for the Book entity: gives us the basic CRUD methods
@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

    // Returns all books in the database as a List
    // (used to display all books from the database on the Books page)
    List<Book> findAll();
}