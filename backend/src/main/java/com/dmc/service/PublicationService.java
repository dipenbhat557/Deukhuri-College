package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Publication;

public interface PublicationService{
    public Publication create(String title, MultipartFile file);

    public List<Publication> getAll();

    public Publication getById(int publicationId);

    public Publication updateById(int publicationId, String title, MultipartFile file);

    public void deleteById(int publicationId);
}