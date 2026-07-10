package com.chaker.bookclub.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

// @Entity: this class maps to the "books" table in the database
@Entity
@Table(name = "books")
public class Book {

    // Primary key, auto-incremented by MySQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Validations: Title, author and thoughts must not be blank
    @NotEmpty(message = "Title must not be blank!")
    private String title;

    // "Author must not be blank" - highlighted in the wireframe
    @NotEmpty(message = "Author must not be blank!")
    private String author;

    @NotEmpty(message = "My thoughts must not be blank!")
    private String myThoughts;

    // createdAt can never be changed after the row is inserted
    @Column(updatable = false)
    private Date createdAt;

    private Date updatedAt;

    // MANY books belong to ONE user (the one who posted the book).
    // fetch = FetchType.LAZY: the user is only fetched when needed.
    @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn defines the foreign key column "user_id" in the books table.
    // This attribute gives the user that posted a specific book.
    @JoinColumn(name = "user_id")
    private User user;

    // Empty constructor required by JPA
    public Book() {
    }

    // Sets createdAt automatically before the first save
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    // Sets updatedAt automatically before every update
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    // ----- getters and setters -----
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getMyThoughts() {
        return myThoughts;
    }

    public void setMyThoughts(String myThoughts) {
        this.myThoughts = myThoughts;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
