package com.dmc.controller;

import java.io.IOException;

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


  @PostMapping("/signin")
public ResponseEntity<?> login(@RequestBody AuthRequest req) {
    User user = this.userService.getByUsernameAndPassword(req.getEmail(), req.getPassword());
    if (user != null) {
        return new ResponseEntity<>(user, HttpStatus.OK);
    } else {
        return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
    }
}


    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> create(@RequestParam("user") String userJson, @RequestParam("file") MultipartFile file) {
       
        ObjectMapper objectMapper = new ObjectMapper();
        
        try {
            UserRequest req  = objectMapper.readValue(userJson, UserRequest.class);
            return new ResponseEntity<>(this.userService.create(req, file), HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        
    }
}
