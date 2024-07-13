package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Advertisement;

public interface AdvertisementService{

    public Advertisement create(MultipartFile file);

    public List<Advertisement> getAll();

    public Advertisement getById(int id);

    public Advertisement updateById(int id, MultipartFile file);

    public void deleteById(int id);
}