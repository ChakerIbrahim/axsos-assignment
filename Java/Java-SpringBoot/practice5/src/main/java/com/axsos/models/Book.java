package com.axsos.models;

import org.antlr.v4.runtime.misc.NotNull;

@Size(min= 3, max = 40, message="Language must be at least 3 characters.")
private String language;
@NotNull
@min(value=100, message="Must be at least 100 pages.")
private Integer numberOfPages;
public class Book {

}
