package com.axsos.repositories;

@Reopositiry
public interface BookRepository extends CrudRepository<Book, Long> {
	List<Book>findAll();
	List<Book>findByDescriptionContaining(String search);
	Long countByTitleContaining(String search);
	Long deleteByTitleStartingWith(String search);
	
}
