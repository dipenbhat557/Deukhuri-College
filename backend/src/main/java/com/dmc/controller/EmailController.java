package com.dmc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dmc.payload.EmailRequest;
import com.dmc.service.EmailService;

@RestController
@RequestMapping("/api/contact")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody EmailRequest request) {
        String emailContent = "From: " + request.getName() + "\n" +
                              "Email: " + request.getEmail() + "\n\n" +
                              "Message:\n" + request.getMessage();

        emailService.sendEmail(request.getEmail(), request.getSubject(), emailContent);

        return new ResponseEntity<>("Message sent successfully", HttpStatus.OK);
    }
    
}
