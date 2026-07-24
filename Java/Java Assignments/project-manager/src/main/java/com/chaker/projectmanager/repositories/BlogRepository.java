package com.chaker.projectmanager.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.chaker.projectmanager.models.Blogs;

// Repository for the Project entity: gives us the basic CRUD methods
@Repository
public interface BlogRepository extends CrudRepository<Blogs, Long> {

    // Returns all projects in the database as a List
    List<Blogs> findAll();
}
