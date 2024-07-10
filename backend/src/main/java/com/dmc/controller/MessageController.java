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

import com.dmc.model.Message;
import com.dmc.payload.MessageRequest;
import com.dmc.service.MessageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/message")
public class MessageController{

    @Autowired
    private MessageService messageService;

    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Message> create(@RequestParam("message") String messageJson, @RequestParam("file") MultipartFile file ){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            MessageRequest req = objectMapper.readValue(messageJson, MessageRequest.class);
            return new ResponseEntity<>(this.messageService.create(req, file),HttpStatus.CREATED);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping
    public ResponseEntity<List<Message>> getAll(){
        return new ResponseEntity<>(this.messageService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{messageId}")
    public ResponseEntity<Message> getById(@PathVariable int messageId){
        return new ResponseEntity<>(this.messageService.getById(messageId),HttpStatus.OK);
    }

    @PutMapping(value = "/{messageId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Message> updateMessage(@PathVariable int messageId, @RequestParam("message") String messageJson, @RequestParam("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            MessageRequest req = objectMapper.readValue(messageJson, MessageRequest.class);
            return new ResponseEntity<>(this.messageService.updateById(messageId, req, file),HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<String> deleteById(@PathVariable int messageId){
        this.messageService.deleteById(messageId);
        return new ResponseEntity<>("Message deleted successfully",HttpStatus.OK);
    }
}