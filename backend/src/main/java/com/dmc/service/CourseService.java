package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Course;
import com.dmc.payload.CourseRequest;

public interface CourseService{

    public Course create(CourseRequest req, MultipartFile file);

    public List<Course> getAll();


    public Course getById(int courseId);

    public Course updateById(int courseId, CourseRequest req, MultipartFile file);

    public void deleteById(int courseId);

}