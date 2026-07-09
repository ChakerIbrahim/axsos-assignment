package com.chaker.dojosandninjas.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.chaker.dojosandninjas.models.Dojo;

// @Repository marks this interface as a Spring bean that talks to the database.
// CrudRepository<Dojo, Long> gives us save(), findById(), findAll(), etc. for free.
@Repository
public interface DojoRepository extends CrudRepository<Dojo, Long> {

    // Returns all dojos in the database as a List instead of an Iterable
    List<Dojo> findAll();
}