package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.exception.ResourceNotFoundException;
import com.dmc.model.Course;
import com.dmc.model.Program;
import com.dmc.payload.CourseRequest;
import com.dmc.repo.CourseRepo;
import com.dmc.service.CourseService;

@Service
public class CourseServiceImpl implements CourseService{

    @Autowired
    public CourseRepo courseRepo;

    @Override
    public Course create(CourseRequest req, MultipartFile file) {
        System.out.println("Reached course service with req "+req);

        
        Course course = new Course();

        course.setShortTitle(req.getShortTitle());
        course.setFullTitle(req.getFullTitle());
        course.setDescription(req.getDescription());
        course.setProgram(req.getProgram());

        try {
            if(file != null){
                course.setImage(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

System.out.println("created course");
        return this.courseRepo.save(course);
    }

    @Override
    public List<Course> getAll() {
        return this.courseRepo.findAll();
    }

    @Override
    public Course getById(int courseId) {
        return this.courseRepo.findById(courseId).orElseThrow(()->new ResourceNotFoundException("Course not found"));
    }

    @Override
    public Course updateById(int courseId, CourseRequest req, MultipartFile file) {
        Course course = getById(courseId);

        course.setShortTitle(req.getShortTitle());
        course.setFullTitle(req.getFullTitle());
        course.setDescription(req.getDescription());
        course.setProgram(req.getProgram());

        try {
            if(file != null){
                course.setImage(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.courseRepo.save(course);
    }

    @Override
    public void deleteById(int courseId) {
        this.courseRepo.delete(getById(courseId));
    }

    @Override
    public List<Course> getByProgram(Program program) {
        return this.courseRepo.findByProgram(program);
    }
}