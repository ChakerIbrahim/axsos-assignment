package com.chaker.projectmanager.models;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

// @Entity: this class maps to the "projects" table in the database
@Entity
@Table(name = "blogs")
public class Blogs {

    // Primary key, auto-incremented by MySQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Validations are present on create & update:
    // "Title must be provided" + at least 3 characters
    @NotEmpty(message = "blog title must be provided!")
    @Size(min = 3, message = "blog title must be at least 3 characters")
    private String title;

    @NotEmpty(message = "blog category must be provided!")
    @Size(min = 3, message = "blog category must be at least 3 characters")
    private String category;

    // "Description must be at least 3 characters"
    @NotEmpty(message = "Content must be provided!")
    @Size(min = 3, message = "content must be at least 20 characters")
    @Column(columnDefinition = "TEXT")
    private String content;

    // "Due date must be provided" and must be upcoming:
    // @Future = strictly after today (a due date in the past
    // makes no sense for a new project).
    @NotNull(message = "Due date must be provided!")
    @Future(message = "Due date must be in the future!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dueDate;

    // createdAt can never be changed after the row is inserted
    @Column(updatable = false)
    private Date createdAt;

    private Date updatedAt;

    // MANY projects are led by ONE user (the creator becomes team lead).
    // The foreign key "lead_id" stores who created the project -
    // a user is only able to edit and delete projects THEY created.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lead_id")
    private User lead;

    // ONE project has MANY team members: this mirrors the "project"
    // attribute in the User class (the users who clicked Join team).
    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    private List<User> team;

    // Empty constructor required by JPA
    public Blogs() {
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
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

//    public Date getDueDate() { return dueDate; }
//    public void setDueDate(Date dueDate) { this.dueDate = dueDate; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }

    public User getLead() { return lead; }
    public void setLead(User lead) { this.lead = lead; }

    public List<User> getTeam() { return team; }
    public void setTeam(List<User> team) { this.team = team; }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }
}
