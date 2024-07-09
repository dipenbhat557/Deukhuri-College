package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Faculty;

public interface FacultyRepo extends JpaRepository<Faculty, Integer>{
    
}