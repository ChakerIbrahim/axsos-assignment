package com.axsos.carFactory.services;

import com.axsos.carFactory.models.Student;
import com.axsos.carFactory.repositires.StudentRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepo studentRepo;

    public StudentService(StudentRepo studentRepo) {
        this.studentRepo = studentRepo;
    }

    public Student fidnStudent(Long studentId) {
        Optional<Student> optionalStudent = studentRepo.findById((studentId));
        if(optionalStudent.isPresent()){
            return optionalStudent.get();
        }
        else{
            return null;
        }
    }
    public List<Student> findAllStudents(){
        return studentRepo.findAll();
    }
}
