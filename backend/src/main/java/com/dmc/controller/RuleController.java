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

import com.dmc.model.Rule;
import com.dmc.payload.RuleRequest;
import com.dmc.service.RuleService;

@RestController
@RequestMapping("/api/rule")
public class RuleController{

    @Autowired
    private RuleService ruleService;

    @PostMapping
    public ResponseEntity<Rule> create(@RequestBody RuleRequest req) {
        System.out.println("fron controller "+req);
        return new ResponseEntity<>(this.ruleService.create(req.getRules()), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Rule>> getAll(){
        return new ResponseEntity<>(this.ruleService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/{ruleId}")
    public ResponseEntity<Rule> getById(@PathVariable int ruleId){
        return new ResponseEntity<>(this.ruleService.getById(ruleId),HttpStatus.OK);
    }

    @PutMapping(value = "/{ruleId}")
    public ResponseEntity<Rule> updateRule(@PathVariable int ruleId, @RequestBody RuleRequest req ){
       
        return new ResponseEntity<>(this.ruleService.updateById(ruleId, req.getRules()),HttpStatus.CREATED);

    }

    @DeleteMapping("/{ruleId}")
    public ResponseEntity<String> deleteById(@PathVariable int ruleId){
        this.ruleService.deleteById(ruleId);
        return new ResponseEntity<>("Rule deleted successfully",HttpStatus.OK);
    }
}