package com.dmc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dmc.model.Subscribed;
import com.dmc.service.SubscribedService;

@RestController
@RequestMapping("/api/subscribed")
public class SubscribedController{

    @Autowired
    private SubscribedService subscribedService;

    @PostMapping(value = "/")
    public ResponseEntity<Subscribed> create(@RequestBody String subscribed ){
       
        return new ResponseEntity<>(this.subscribedService.create(subscribed),HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Subscribed>> getAll(){
        return new ResponseEntity<>(this.subscribedService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{subscribedId}")
    public ResponseEntity<Subscribed> getById(@PathVariable int subscribedId){
        return new ResponseEntity<>(this.subscribedService.getById(subscribedId),HttpStatus.OK);
    }

    @PutMapping(value = "/{subscribedId}")
    public ResponseEntity<Subscribed> updateSubscribed(@PathVariable int subscribedId, @RequestBody String subscribed ){
       
        return new ResponseEntity<>(this.subscribedService.updateById(subscribedId, subscribed),HttpStatus.CREATED);

    }

    @DeleteMapping("/{subscribedId}")
    public ResponseEntity<String> deleteById(@PathVariable int subscribedId){
        this.subscribedService.deleteById(subscribedId);
        return new ResponseEntity<>("Subscribed deleted successfully",HttpStatus.OK);
    }
}