package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Rule;

public interface RuleRepo extends JpaRepository<Rule, Integer>{}