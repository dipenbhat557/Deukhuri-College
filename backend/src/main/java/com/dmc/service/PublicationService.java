package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Publication;
import com.dmc.payload.PublicationResponse;

public interface PublicationService {
    public Publication create(String title, String type, MultipartFile file);

    public List<PublicationResponse> getAll();

    public Publication getById(int publicationId);

    public byte[] getFileById(int publicationId);

    public Publication updateById(int publicationId, String title, String type, MultipartFile file);

    public void deleteById(int publicationId);
}