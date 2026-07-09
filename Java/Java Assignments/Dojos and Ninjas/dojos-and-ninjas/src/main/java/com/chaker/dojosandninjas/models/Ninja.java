package com.chaker.dojosandninjas.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

// @Entity marks this class as a JPA entity (a table in the database)
@Entity
// @Table sets the actual table name in MySQL to "ninjas"
@Table(name = "ninjas")
public class Ninja {

    // Primary key, auto-incremented by MySQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private int age;

    // createdAt can never be changed after the row is inserted
    @Column(updatable = false)
    private Date createdAt;

    private Date updatedAt;

    // MANY ninjas belong to ONE dojo.
    // fetch = FetchType.LAZY: the dojo is only fetched when needed.
    @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn defines the foreign key column "dojo_id" in the ninjas table.
    // This attribute gives the dojo that a specific ninja belongs to.
    @JoinColumn(name = "dojo_id")
    private Dojo dojo;

    // Empty constructor required by JPA
    public Ninja() {
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
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

    public Dojo getDojo() {
        return dojo;
    }

    public void setDojo(Dojo dojo) {
        this.dojo = dojo;
    }
}