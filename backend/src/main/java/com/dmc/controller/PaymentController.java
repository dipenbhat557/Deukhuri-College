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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Payment;
import com.dmc.service.PaymentService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;
    
   @PostMapping(value = "/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Payment> create( @PathVariable int userId ,@RequestParam("file") MultipartFile file ) throws IOException{
    
        return new ResponseEntity<>(this.paymentService.create(userId,file),HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAll(){
        return new ResponseEntity<>(this.paymentService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<Payment> getById(@PathVariable int paymentId){
        return new ResponseEntity<>(this.paymentService.getById(paymentId),HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{paymentId}")
    public ResponseEntity<String> deleteById(@PathVariable int paymentId){
        this.paymentService.delete(paymentId);
        return new ResponseEntity<>("Payment deleted successfully!!",HttpStatus.ACCEPTED);
    }

    @PutMapping("/verify/{paymentId}")
    public ResponseEntity<Payment> verify(@PathVariable int paymentId){
        return new ResponseEntity<>(this.paymentService.verify(paymentId),HttpStatus.OK);
    }
}
