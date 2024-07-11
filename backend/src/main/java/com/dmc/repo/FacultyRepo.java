package com.dmc.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Faculty;
import com.dmc.model.FacultyCategory;

public interface FacultyRepo extends JpaRepository<Faculty, Integer>{
    public List<Faculty> findByCategory(FacultyCategory category);
}