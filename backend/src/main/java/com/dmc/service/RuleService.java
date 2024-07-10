package com.dmc.service;

import java.util.List;

import com.dmc.model.Rule;

public interface RuleService{
    public Rule create(List<String> req);

    public List<Rule> getAll();

    public Rule getById(int ruleId);

    public Rule updateById(int ruleId, List<String> req);

    public void deleteById(int ruleId);
}