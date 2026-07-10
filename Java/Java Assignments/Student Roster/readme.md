# Student Roster

## Preview

### Review
[Watch the review video](https://drive.google.com/file/d/1nf32aukpuWjJE7nJM_4ZN6pN3EDsnSfl/view?usp=drive_link)
### Dashboard
![dashboard](dashboard.png)
### Add a Dorm Page
![add dorm page](newDorm.png)
### Add a Student Page
![add student page](newStudent.png)
### Dorm Details Page
![dorm details page](show.png)

## Run the app
```
# 1. navigate to the project folder
cd Desktop\axsos\Java\spring boot\studentrostar

# 2. build and run the Spring Boot app
./mvnw spring-boot:run
```
Then open your browser at: `http://localhost:8080/dorms`

## Built With
- [Java](https://www.java.com/) — programming language
- [Spring Boot](https://spring.io/projects/spring-boot) — Java web framework
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa) — database ORM layer
- [JSP](https://www.oracle.com/java/technologies/jspt.html) — Java Server Pages for HTML templating

## Features
- Display all dorms on a dashboard with the total count
- Add a new dorm with a name via a dedicated form
- Delete a dorm directly from the dashboard
- View a dorm's detail page showing all assigned students
- Add a new student and assign them to a dorm via a dropdown
- Assign an existing student to a dorm from the dorm detail page
- Remove a student from a dorm
- One-to-many relationship between Dorms and Students