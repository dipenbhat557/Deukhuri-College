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

import com.dmc.model.Publication;
import com.dmc.payload.PublicationRequest;
import com.dmc.service.PublicationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/publication")
public class PublicationController{

    @Autowired
    private PublicationService publicationService;

    @PostMapping(value="/",consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Publication> create(@RequestParam("publication") String publicationJson, @RequestParam("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            PublicationRequest req = objectMapper.readValue(publicationJson, PublicationRequest.class);
            return new ResponseEntity<>(this.publicationService.create(req, file),HttpStatus.CREATED);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<Publication>> getAll(){
        return new ResponseEntity<>(this.publicationService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{publicationId}")
    public ResponseEntity<Publication> getById(@PathVariable int publicationId){
        return new ResponseEntity<>(this.publicationService.getById(publicationId),HttpStatus.OK);
    }

    @PutMapping(value = "/{publicationId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Publication> updateNotice(@PathVariable int publicationId, @RequestParam("publication") String publicationJson, @RequestParam("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            PublicationRequest req = objectMapper.readValue(publicationJson, PublicationRequest.class);
            return new ResponseEntity<>(this.publicationService.updateById(publicationId, req, file),HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/{publicationId}")
    public ResponseEntity<String> deleteById(@PathVariable int publicationId){
        this.publicationService.deleteById(publicationId);
        return new ResponseEntity<>("Publication deleted successfully",HttpStatus.OK);
    }

}