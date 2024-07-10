package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Publication;
import com.dmc.payload.PublicationRequest;

public interface PublicationService{
    public Publication create(PublicationRequest req, MultipartFile file);

    public List<Publication> getAll();

    public Publication getById(int publicationId);

    public Publication updateById(int publicationId, PublicationRequest req, MultipartFile file);

    public void deleteById(int publicationId);
}