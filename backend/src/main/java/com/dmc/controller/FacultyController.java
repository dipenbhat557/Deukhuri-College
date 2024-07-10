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

import com.dmc.model.Faculty;
import com.dmc.payload.FacultyRequest;
import com.dmc.service.FacultyService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController{

    @Autowired
    private FacultyService facultyService;

     @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Faculty> create(@RequestParam("faculty") String facultyJson, @RequestParam("file") MultipartFile file ){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            FacultyRequest req = objectMapper.readValue(facultyJson, FacultyRequest.class);
            return new ResponseEntity<>(this.facultyService.create(req, file),HttpStatus.CREATED);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping
    public ResponseEntity<List<Faculty>> getAll(){
        return new ResponseEntity<>(this.facultyService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{facultyId}")
    public ResponseEntity<Faculty> getById(@PathVariable int facultyId){
        return new ResponseEntity<>(this.facultyService.getById(facultyId),HttpStatus.OK);
    }

    @PutMapping(value = "/{facultyId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Faculty> updateFaculty(@PathVariable int facultyId, @RequestParam("faculty") String facultyJson, @RequestParam("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            FacultyRequest req = objectMapper.readValue(facultyJson, FacultyRequest.class);
            return new ResponseEntity<>(this.facultyService.updateById(facultyId, req, file),HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/{facultyId}")
    public ResponseEntity<String> deleteById(@PathVariable int facultyId){
        this.facultyService.deleteById(facultyId);
        return new ResponseEntity<>("Faculty deleted successfully",HttpStatus.OK);
    }
}