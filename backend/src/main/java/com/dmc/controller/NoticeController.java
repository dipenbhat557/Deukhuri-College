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

import com.dmc.model.Notice;
import com.dmc.payload.NoticeRequest;
import com.dmc.service.NoticeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/notice")
public class NoticeController{

    @Autowired
    private NoticeService noticeService;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Notice> create(@RequestParam("notice") String noticeJson, @RequestParam("file") MultipartFile file ){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            NoticeRequest req = objectMapper.readValue(noticeJson, NoticeRequest.class);
            return new ResponseEntity<>(this.noticeService.create(req, file),HttpStatus.CREATED);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping
    public ResponseEntity<List<Notice>> getAll(){
        return new ResponseEntity<>(this.noticeService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{noticeId}")
    public ResponseEntity<Notice> getById(@PathVariable int noticeId){
        return new ResponseEntity<>(this.noticeService.getById(noticeId),HttpStatus.OK);
    }

    @PutMapping(value = "/{noticeId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Notice> updateNotice(@PathVariable int noticeId, @RequestParam("notice") String noticeJson, @RequestParam("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            NoticeRequest req = objectMapper.readValue(noticeJson, NoticeRequest.class);
            return new ResponseEntity<>(this.noticeService.updateById(noticeId, req, file),HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/{noticeId}")
    public ResponseEntity<String> deleteById(@PathVariable int noticeId){
        this.noticeService.deleteById(noticeId);
        return new ResponseEntity<>("Notice deleted successfully",HttpStatus.OK);
    }
}
