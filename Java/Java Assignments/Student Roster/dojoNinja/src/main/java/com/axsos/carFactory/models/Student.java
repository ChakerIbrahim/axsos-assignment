package com.axsos.carFactory.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Date;

@Entity
@Table(name = "students")
public class Student {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Size(min = 2 , max = 60 , message = "name must be between 2 and 60 characters")
    private String name;

    @Column(updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dorm-Id")
    private Dorm dorm ;


    public Student(){

    }

    public Student(String name, Date createdAt, Date updatedAt, Dorm dorm) {
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.dorm = dorm;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public Dorm getDorm() {
        return dorm;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setDorm(Dorm dorm) {
        this.dorm = dorm;
    }
}
