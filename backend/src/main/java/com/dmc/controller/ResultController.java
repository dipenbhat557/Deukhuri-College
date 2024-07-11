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

import com.dmc.model.Result;
import com.dmc.payload.ResultRequest;
import com.dmc.service.ResultService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/result")
public class ResultController{

    @Autowired
    private ResultService resultService;

    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Result> create(@RequestParam("result") String resultJson, @RequestParam("file") MultipartFile file ){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            ResultRequest req = objectMapper.readValue(resultJson, ResultRequest.class);
            return new ResponseEntity<>(this.resultService.create(req, file),HttpStatus.CREATED);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping
    public ResponseEntity<List<Result>> getAll(){
        return new ResponseEntity<>(this.resultService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{resultId}")
    public ResponseEntity<Result> getById(@PathVariable int resultId){
        return new ResponseEntity<>(this.resultService.getById(resultId),HttpStatus.OK);
    }

    @PutMapping(value = "/{resultId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Result> updateResult(@PathVariable int resultId, @RequestParam("result") String resultJson, @RequestParam("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            ResultRequest req = objectMapper.readValue(resultJson, ResultRequest.class);
            return new ResponseEntity<>(this.resultService.updateById(resultId, req, file),HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/{resultId}")
    public ResponseEntity<String> deleteById(@PathVariable int resultId){
        this.resultService.deleteById(resultId);
        return new ResponseEntity<>("Result deleted successfully",HttpStatus.OK);
    }
}