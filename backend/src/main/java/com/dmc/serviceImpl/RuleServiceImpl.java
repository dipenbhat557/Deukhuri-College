package com.dmc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dmc.model.Rule;
import com.dmc.repo.RuleRepo;
import com.dmc.service.RuleService;

@Service
public class RuleServiceImpl implements RuleService{

    @Autowired
    private RuleRepo ruleRepo;

    @Override
    public Rule create(List<String> req) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Rule> getAll() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Rule getById(int ruleId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Rule updateById(int ruleId, List<String> req) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void deleteById(int ruleId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}