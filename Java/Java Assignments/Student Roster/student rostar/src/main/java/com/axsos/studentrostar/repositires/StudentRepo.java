package com.axsos.studentrostar.repositires;

import com.axsos.studentrostar.models.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepo extends CrudRepository<Student,Long> {
    List<Student> findAll();
}
