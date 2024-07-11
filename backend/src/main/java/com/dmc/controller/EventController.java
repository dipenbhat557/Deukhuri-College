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

import com.dmc.model.Event;
import com.dmc.payload.EventRequest;
import com.dmc.service.EventService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/event")
public class EventController{

    @Autowired
    private EventService eventService;

   @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Event> create(@RequestParam("event") String eventJson, @RequestParam("file") MultipartFile file ){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            EventRequest req = objectMapper.readValue(eventJson, EventRequest.class);
            return new ResponseEntity<>(this.eventService.create(req, file),HttpStatus.CREATED);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping
    public ResponseEntity<List<Event>> getAll(){
        return new ResponseEntity<>(this.eventService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getById(@PathVariable int eventId){
        return new ResponseEntity<>(this.eventService.getById(eventId),HttpStatus.OK);
    }

    @PutMapping(value = "/{eventId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Event> updateEvent(@PathVariable int eventId, @RequestParam("event") String eventJson, @RequestParam("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            EventRequest req = objectMapper.readValue(eventJson, EventRequest.class);
            return new ResponseEntity<>(this.eventService.updateById(eventId, req, file),HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<String> deleteById(@PathVariable int eventId){
        this.eventService.deleteById(eventId);
        return new ResponseEntity<>("Event deleted successfully",HttpStatus.OK);
    }
}