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

import com.dmc.model.Blog;
import com.dmc.payload.BlogRequest;
import com.dmc.service.BlogService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/blog")
public class BlogController{

    @Autowired
    private BlogService blogService;

    @PostMapping(value="",consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Blog> create(@RequestParam("blog") String blogJson, @RequestParam("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            BlogRequest req = objectMapper.readValue(blogJson, BlogRequest.class);
            return new ResponseEntity<>(this.blogService.create(req, file),HttpStatus.CREATED);
        } catch (JsonProcessingException e) {

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping
    public ResponseEntity<List<Blog>> getAll(){
        return new ResponseEntity<>(this.blogService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{blogId}")
    public ResponseEntity<Blog> getById(@PathVariable int blogId){
        return new ResponseEntity<>(this.blogService.getById(blogId),HttpStatus.OK);
    }

    @PutMapping(value="/{blogId}",consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Blog> updateBlog(@PathVariable int blogId, @RequestParam("blog") String blogJson, @RequestParam("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            BlogRequest req = objectMapper.readValue(blogJson, BlogRequest.class);
            return new ResponseEntity<>(this.blogService.updateBlog(blogId, req, file),HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
    }

    @DeleteMapping("/{blogId}")
    public ResponseEntity<String> deleteById(@PathVariable int blogId){
        this.blogService.deleteById(blogId);
        return new ResponseEntity<>("Blog deleted successfully",HttpStatus.OK);
    }
}