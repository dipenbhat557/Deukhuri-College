package com.dmc.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.User;
import com.dmc.payload.UserRequest;
import com.dmc.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/user")
public class UserController{

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAll(){
        return new ResponseEntity<>(this.userService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getById(@PathVariable int userId){
        return new ResponseEntity<>(this.userService.getById(userId),HttpStatus.OK);
    }

    @PutMapping(value="/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> updateUser(@PathVariable int userId,@RequestParam("user") String userJson, @RequestParam("file") MultipartFile file ){
        ObjectMapper objectMapper = new ObjectMapper();

         try {
            UserRequest req = objectMapper.readValue(userJson, UserRequest.class);
            return new ResponseEntity<>(this.userService.updateUser(userId, req,file),HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteById(@PathVariable int userId){
        this.userService.deleteById(userId);
        return new ResponseEntity<>("User deleted Successfully",HttpStatus.OK);
    }
}