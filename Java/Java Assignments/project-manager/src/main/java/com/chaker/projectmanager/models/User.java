package com.chaker.projectmanager.models;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

// @Entity: this class maps to the "users" table in the database
@Entity
@Table(name = "users")
public class User {

    // Primary key, auto-incremented by MySQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // First name - not blank, at least 3 characters
    @NotEmpty(message = "First name is required!")
    @Size(min = 8, max = 30, message = "First name must be at least 8 characters")
    private String firstName;

    // Last name - not blank, at least 3 characters
    @NotEmpty(message = "Last name is required!")
    @Size(min = 8, max = 30, message = "Last name must be at least 8 characters")
    private String lastName;

    // Email - valid format; uniqueness checked in the service
    @NotEmpty(message = "Email is required!")
    @Email(message = "Please enter a valid email!")
    private String email;

    // Password - at least 8 characters
    @NotEmpty(message = "Password is required!")
    @Size(min = 8, max = 128, message = "Password must be at least 8 characters")
    private String password;

    // @Transient: never stored; only compared against password
    @Transient
    @NotEmpty(message = "Confirm Password is required!")
    @Size(min = 8, max = 128, message = "Confirm Password must be at least 8 characters")
    private String confirm;

    // NINJA BONUS: date of birth (date picker on the form).
    // @NotNull because a date is not text; @Past = before today;
    // the minimum-age math lives in the service.
    // @DateTimeFormat converts the picker's text into a LocalDate.
    @NotNull(message = "Date of birth is required!")
    @Past(message = "Date of birth must be in the past!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    // NINJA BONUS: upload avatar from the PC.
    // The FILE itself arrives separately as a MultipartFile (validated
    // in the controller); this field only stores the PATH of the saved
    // picture (e.g. "/uploads/173..._me.png") so pages can display it.
    private String avatar;

    // ONE-TO-MANY #1 (as the "one" side): ONE user LEADS many projects.
    // "Allow users to create projects (and automatically become team lead)"
    @OneToMany(mappedBy = "lead", fetch = FetchType.LAZY)
    private List<Blogs> projectsLed;

    // ONE-TO-MANY #2 (as the "many" side): MANY users can JOIN ONE project.
    // This replaces the many-to-many "join team": the foreign key
    // "project_id" on the user stores the ONE team they joined.
    // null = the user has not joined any team.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Blogs project;

    // Empty constructor required by JPA
    public User() {
    }

    // ----- getters and setters -----
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getConfirm() { return confirm; }
    public void setConfirm(String confirm) { this.confirm = confirm; }

    public List<Blogs> getProjectsLed() { return projectsLed; }
    public void setProjectsLed(List<Blogs> projectsLed) { this.projectsLed = projectsLed; }

    public Blogs getProject() { return project; }
    public void setProject(Blogs project) { this.project = project; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
}