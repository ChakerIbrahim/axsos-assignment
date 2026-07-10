package com.axsos.studentrostar.services;

import com.axsos.studentrostar.models.Dorm;
import com.axsos.studentrostar.models.Student;
import com.axsos.studentrostar.repositires.StudentRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepo studentRepo;
    private final DormServices dormServices;

    public StudentService(StudentRepo studentRepo, DormServices dormServices) {
        this.studentRepo = studentRepo;
        this.dormServices = dormServices;
    }

    public Student fidnStudent(Long student_id) {
        Optional<Student> optionalStudent = studentRepo.findById((student_id));
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
    public void createCallStudent(Student student){
        studentRepo.save(student);
    }
    public void deleteCallStudent(Long student_id){
        studentRepo.deleteById(student_id);
    }
    public void assignDorm(Long student_id,Long dorm_id){
        Student student = studentRepo.findById(student_id).get();
        Dorm dorm = dormServices.findDorm(dorm_id);
        student.setDorm(dorm);
        studentRepo.save(student);
    }
}
