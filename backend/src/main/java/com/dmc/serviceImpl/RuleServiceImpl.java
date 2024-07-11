package com.dmc.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dmc.exception.ResourceNotFoundException;
import com.dmc.model.Rule;
import com.dmc.repo.RuleRepo;
import com.dmc.service.RuleService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RuleServiceImpl implements RuleService{

    @Autowired
    private RuleRepo ruleRepo;

    @Override
@Transactional
public Rule create(List<String> req) {
    // Log the contents of req
    System.out.println("Received rules: " + req);
    if (req == null || req.isEmpty()) {
        throw new IllegalArgumentException("The rules list cannot be null or empty");
    }

    Rule rule = new Rule();

    

    // Convert req to a new ArrayList
    List<String> rulesList = new ArrayList<>(req);

    rule.setRules(rulesList);

    return this.ruleRepo.save(rule);
}


    @Override
    public List<Rule> getAll() {
        return this.ruleRepo.findAll();
    }

    @Override
    public Rule getById(int ruleId) {
        return this.ruleRepo.findById(ruleId).orElseThrow(()->new ResourceNotFoundException("Rule not found"));
    }

    @Override
    public Rule updateById(int ruleId, List<String> req) {
        Rule rule = this.getById(ruleId);

        rule.setRules(req);

        return this.ruleRepo.save(rule);
    }

    @Override
    public void deleteById(int ruleId) {
        this.ruleRepo.delete(this.getById(ruleId));
    }
}