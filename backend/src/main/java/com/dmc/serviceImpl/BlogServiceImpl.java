package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.exception.ResourceNotFoundException;
import com.dmc.model.Blog;
import com.dmc.payload.BlogRequest;
import com.dmc.repo.BlogRepo;
import com.dmc.service.BlogService;

@Service
public class BlogServiceImpl implements BlogService{

    @Autowired
    private BlogRepo blogRepo;

    @Override
    public Blog create(BlogRequest req, MultipartFile file) {
        Blog blog = new Blog();

        blog.setTitle(req.getTitle());
        blog.setDescription(req.getDescription());

        try {
            if(file != null){
                blog.setImg(file.getBytes());
            }
        } catch (IOException e) {
            throw new ResourceNotFoundException("Image not found");
        }

        return this.blogRepo.save(blog);
    }

    @Override
    public List<Blog> getAll() {
        return this.blogRepo.findAll();
    }

    @Override
    public Blog getById(int blogId) {
        return this.blogRepo.findById(blogId).orElseThrow(()->new ResourceNotFoundException("Blog not found"));
    }

    @Override
    public Blog updateBlog(int blogId, BlogRequest req, MultipartFile file) {
        Blog blog = getById(blogId);

        blog.setTitle(req.getTitle());
        blog.setDescription(req.getDescription());

        try {
            if(file != null){
                blog.setImg(file.getBytes());
            }
        } catch (IOException e) {
            throw new ResourceNotFoundException("Image not found");
        }

        return this.blogRepo.save(blog);
    }

    @Override
    public void deleteById(int blogId) {
        this.blogRepo.delete(getById(blogId));
    }
}