package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Blog;
import com.dmc.payload.BlogRequest;

public interface BlogService{

    public Blog create(BlogRequest req, MultipartFile file);

    public List<Blog> getAll();

    public Blog getById(int blogId);

    public Blog updateBlog(int blogId, BlogRequest req, MultipartFile file);

    public void deleteById(int blogId);
}