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

import com.dmc.model.Statute;
import com.dmc.payload.StatuteRequest;
import com.dmc.service.StatuteService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/statute")
public class StatuteController{

    @Autowired
    private StatuteService statuteService;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Statute> create(@RequestParam("statute") String statuteJson, @RequestParam("file") MultipartFile file ){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            StatuteRequest req = objectMapper.readValue(statuteJson, StatuteRequest.class);
            return new ResponseEntity<>(this.statuteService.create(req, file),HttpStatus.CREATED);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping
    public ResponseEntity<List<Statute>> getAll(){
        return new ResponseEntity<>(this.statuteService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{statuteId}")
    public ResponseEntity<Statute> getById(@PathVariable int statuteId){
        return new ResponseEntity<>(this.statuteService.getById(statuteId),HttpStatus.OK);
    }

    @PutMapping(value = "/{statuteId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Statute> updateStatute(@PathVariable int statuteId, @RequestParam("statute") String statuteJson, @RequestParam("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            StatuteRequest req = objectMapper.readValue(statuteJson, StatuteRequest.class);
            return new ResponseEntity<>(this.statuteService.updateById(statuteId, req, file),HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/{statuteId}")
    public ResponseEntity<String> deleteById(@PathVariable int statuteId){
        this.statuteService.deleteById(statuteId);
        return new ResponseEntity<>("Statute deleted successfully",HttpStatus.OK);
    }
}
