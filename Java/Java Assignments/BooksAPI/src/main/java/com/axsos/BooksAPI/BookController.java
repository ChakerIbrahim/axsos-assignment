package com.axsos.BooksAPI;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="books")



public class BookController {

	// Primary key for each book row in the database
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Book information
	private String title;
	private String description;
	private String language;
	private Integer pages;
}

public Book() {
}

public Book(String title, String description, String language, Integer pages) {
    this.title = title;
    this.description = description;
    this.language = language;
    this.pages = pages;
}


public Long getId() {
    return id;
}

public String getTitle() {
    return title;
}

public void setTitle(String title) {
    this.title = title;
}

public String getDescription() {
    return description;
}

public void setDescription(String description) {
    this.description = description;
}

public String getLanguage() {
    return language;
}

public void setLanguage(String language) {
    this.language = language;
}

public Integer getPages() {
    return pages;
}

public void setPages(Integer pages) {
    this.pages = pages;
}
}
	
	
