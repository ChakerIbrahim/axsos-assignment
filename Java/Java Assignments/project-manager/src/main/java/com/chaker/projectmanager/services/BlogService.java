package com.chaker.projectmanager.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chaker.projectmanager.models.Blogs;
import com.chaker.projectmanager.models.User;
import com.chaker.projectmanager.repositories.BlogRepository;

// Service layer for Blog: CRUD + the two dashboard lists
@Service
public class BlogService {

    // @Autowired injects the repository, so we omit the constructor
    @Autowired
    private BlogRepository blogsRepo;

    // Returns all blogss
    public List<Blogs> allBlogs() {
        return blogsRepo.findAll();
    }

    // "Involved in" means: the user LEADS the blogs,
    // OR the user JOINED the blogs (their blogs foreign key).

    // The dashboard table with all the blogss the user
    // is NOT involved in (these get the "Join team" action).
    public List<Blogs> blogsNotInvolved(User user) {
        List<Blogs> result = new ArrayList<Blogs>();
        // Loop over every blogs and keep only the ones where the
        // user is neither the lead nor a joined team member.
        for (Blogs blogs : BlogRepository.findAll()) {
            boolean isLead = blogs.getLead().getId().equals(user.getId());
            boolean joined = user.getBlog() != null
                    && user.getBlog().getId().equals(blogs.getId());
            if (!isLead && !joined) {
                result.add(blogs);
            }
        }
        return result;
    }

    // The dashboard table with all the blogss the user
    // IS involved in (leads -> edit/delete; joined -> leave).
    public List<Blogs> blogsInvolved(User user) {
        List<Blogs> result = new ArrayList<Blogs>();
        for (Blogs blogs : blogsRepo.findAll()) {
            boolean isLead = blogs.getLead().getId().equals(user.getId());
            boolean joined = user.getBlog() != null
                    && user.getBlog().getId().equals(blogs.getId());
            if (isLead || joined) {
                result.add(blogs);
            }
        }
        return result;
    }

    // Creates (saves) a new blogs - the lead is already attached
    public Blogs createBlog(Blogs blogs) {
        return blogsRepo.save(blogs);
    }

    // Finds one blogs by its id, or returns null if it does not exist
    public Blogs findBlog(Long id) {
        Optional<Blogs> optionalBlog = blogsRepo.findById(id);
        if (optionalBlog.isPresent()) {
            return optionalBlog.get();
        } else {
            return null;
        }
    }

    // Updates an existing blogs (id present -> save() UPDATEs)
    public Blogs updateBlog(Blogs blogs) {
        return blogsRepo.save(blogs);
    }

    // Deletes a blogs by its id
    public void deleteBlog(Long id) {
        blogsRepo.deleteById(id);
    }
}
