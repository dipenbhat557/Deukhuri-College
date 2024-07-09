package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Syllabus;

public interface SyllabusRepo extends JpaRepository<Syllabus, Integer>{}