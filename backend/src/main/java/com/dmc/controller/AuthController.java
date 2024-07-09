package com.dmc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dmc.model.User;
import com.dmc.payload.AuthRequest;
import com.dmc.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController{

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody AuthRequest req){
        return new ResponseEntity<>(this.userService.getByUsernameAndPassword(req.getEmail(), req.getPassword()),HttpStatus.OK);
    }
}