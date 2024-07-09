package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Publication;

public interface PublicationRepo extends JpaRepository<Publication, Integer>{}