package com.dmc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Course;
import com.dmc.model.Program;
import com.dmc.payload.CourseRequest;
import com.dmc.service.CourseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/course")
public class CourseController{

    @Autowired
    private CourseService courseService;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Course> create(@RequestParam("course") String courseJson, @RequestParam("file") MultipartFile file ){
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println("reaced course controller with courseJson"+courseJson);


        try {
            
            CourseRequest req = objectMapper.readValue(courseJson, CourseRequest.class);
            return new ResponseEntity<>(this.courseService.create(req, file),HttpStatus.CREATED);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping
    public ResponseEntity<List<Course>> getAll(){
        return new ResponseEntity<>(this.courseService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<Course> getById(@PathVariable int courseId){
        return new ResponseEntity<>(this.courseService.getById(courseId),HttpStatus.OK);
    }

    @PutMapping(value = "/{courseId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Course> updateCourse(@PathVariable int courseId, @RequestParam("course") String courseJson, @RequestParam("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            CourseRequest req = objectMapper.readValue(courseJson, CourseRequest.class);
            return new ResponseEntity<>(this.courseService.updateById(courseId, req, file),HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<String> deleteById(@PathVariable int courseId){
        this.courseService.deleteById(courseId);
        return new ResponseEntity<>("Course deleted successfully",HttpStatus.OK);
    }

    @GetMapping("/program")
    public ResponseEntity<List<Course>> getByProgram(@RequestParam("program") Program program){
        return new ResponseEntity<>(this.courseService.getByProgram(program),HttpStatus.OK);
    }
}