package com.axsos.studentrostar.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "dorms")
public class Dorm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dorm_id;

    @NotNull
    @Size(min = 2,max = 30 , message = "fill name dorm")
    private String dormName;

    @Column(updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date updatedAt;


    @OneToMany(mappedBy = "dorm",fetch = FetchType.LAZY)
    private List<Student> student;

    public Dorm(){}
    public Dorm(String dormName){
        this.dormName = dormName;
    }

    @PrePersist
    protected void onCreate(){
        this.createdAt=new Date();
    }
    @PreUpdate
    protected void onUpdate(){
        this.updatedAt=new Date();
    }

    public String getDormName() {
        return dormName;
    }

    public void setDormName(String dormName) {
        this.dormName = dormName;
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

    public Long getDorm_id() {
        return dorm_id;
    }

    public void setDorm_id(Long dorm_id) {
        this.dorm_id = dorm_id;
    }

    public List<Student> getStudent() {
        return student;
    }

    public void setStudent(List<Student> student) {
        this.student = student;
    }
}
