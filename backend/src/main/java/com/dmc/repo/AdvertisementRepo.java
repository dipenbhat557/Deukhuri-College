package com.dmc.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dmc.model.Advertisement;

public interface AdvertisementRepo extends JpaRepository<Advertisement, Integer>{}