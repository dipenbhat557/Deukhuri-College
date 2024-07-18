package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Admission;

public interface AdmissionRepo extends JpaRepository<Admission, Integer>{
    
}