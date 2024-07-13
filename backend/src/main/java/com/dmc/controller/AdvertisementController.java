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

import com.dmc.model.Advertisement;
import com.dmc.service.AdvertisementService;

@RestController
@RequestMapping("/api/advertisement")
public class AdvertisementController{

    @Autowired
    private AdvertisementService advertisementService;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Advertisement> create( @RequestParam("file") MultipartFile file ){
        return new ResponseEntity<>(this.advertisementService.create(file),HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Advertisement>> getAll(){
        return new ResponseEntity<>(this.advertisementService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{advertisementId}")
    public ResponseEntity<Advertisement> getById(@PathVariable int advertisementId){
        return new ResponseEntity<>(this.advertisementService.getById(advertisementId),HttpStatus.OK);
    }

    @PutMapping("/{advertisementId}")
    public ResponseEntity<Advertisement> update(@PathVariable int advertisementId, @RequestParam("file") MultipartFile file){
        return new ResponseEntity<>(this.advertisementService.updateById(advertisementId, file),HttpStatus.OK);
    }

    @DeleteMapping("/{advertisementId}")
    public ResponseEntity<String> deleteById(@PathVariable int advertisementId){
        this.advertisementService.deleteById(advertisementId);
        return new ResponseEntity<>("Advertisement deleted successfully",HttpStatus.OK);
    }
}