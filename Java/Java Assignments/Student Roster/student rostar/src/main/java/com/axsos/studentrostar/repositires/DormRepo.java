package com.axsos.studentrostar.repositires;

import com.axsos.studentrostar.models.Dorm;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DormRepo extends CrudRepository<Dorm,Long> {
    List<Dorm> findAll();

}
