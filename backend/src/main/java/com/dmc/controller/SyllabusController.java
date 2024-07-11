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

import com.dmc.model.Syllabus;
import com.dmc.payload.SyllabusRequest;
import com.dmc.service.SyllabusService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/syllabus")
public class SyllabusController{

    @Autowired
    private SyllabusService syllabusService;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Syllabus> create(@RequestParam("syllabus") String syllabusJson, @RequestParam("file") MultipartFile file ){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            SyllabusRequest req = objectMapper.readValue(syllabusJson, SyllabusRequest.class);
            return new ResponseEntity<>(this.syllabusService.create(req, file),HttpStatus.CREATED);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping
    public ResponseEntity<List<Syllabus>> getAll(){
        return new ResponseEntity<>(this.syllabusService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{syllabusId}")
    public ResponseEntity<Syllabus> getById(@PathVariable int syllabusId){
        return new ResponseEntity<>(this.syllabusService.getById(syllabusId),HttpStatus.OK);
    }

    @PutMapping(value = "/{syllabusId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Syllabus> updateSyllabus(@PathVariable int syllabusId, @RequestParam("syllabus") String syllabusJson, @RequestParam("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            SyllabusRequest req = objectMapper.readValue(syllabusJson, SyllabusRequest.class);
            return new ResponseEntity<>(this.syllabusService.updateById(syllabusId, req, file),HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/{syllabusId}")
    public ResponseEntity<String> deleteById(@PathVariable int syllabusId){
        this.syllabusService.deleteById(syllabusId);
        return new ResponseEntity<>("Syllabus deleted successfully",HttpStatus.OK);
    }
}
