package com.dmc.controller;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.User;
import com.dmc.payload.AuthRequest;
import com.dmc.payload.UserRequest;
import com.dmc.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/signin")
    public ResponseEntity<User> login(@RequestBody AuthRequest req) {
        return new ResponseEntity<>(this.userService.getByUsernameAndPassword(req.getEmail(), req.getPassword()), HttpStatus.OK);
    }

    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> create(@RequestParam("user") String userJson, @RequestParam("file") MultipartFile file) {
        logger.info("Inside controller");
        
        // Convert userJson to UserRequest object
        ObjectMapper objectMapper = new ObjectMapper();
        UserRequest req = null;
        try {
            req = objectMapper.readValue(userJson, UserRequest.class);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<>(this.userService.create(req, file), HttpStatus.CREATED);
    }
}
