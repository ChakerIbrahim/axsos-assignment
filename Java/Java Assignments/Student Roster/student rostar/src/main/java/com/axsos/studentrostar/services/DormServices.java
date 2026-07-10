package com.axsos.studentrostar.services;

import com.axsos.studentrostar.models.Dorm;
import com.axsos.studentrostar.repositires.DormRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DormServices {
    private final DormRepo dormRepo;

    public DormServices(DormRepo dormRepo){
        this.dormRepo=  dormRepo;
    }

    public List<Dorm> showAllTheDorms(){
        return dormRepo.findAll();
    }

    public Dorm findDorm(Long dorm_id){
        Optional<Dorm> optionalDorm = dormRepo.findById(dorm_id);
        if(optionalDorm.isPresent()){
            return optionalDorm.get();
        }else {
            return null;
        }

    }
    public void createCallDorm(Dorm dorm){
        dormRepo.save(dorm);
    }
    public void deleteCallDorm(Long dorm_id){
        dormRepo.deleteById(dorm_id);
    }



}
