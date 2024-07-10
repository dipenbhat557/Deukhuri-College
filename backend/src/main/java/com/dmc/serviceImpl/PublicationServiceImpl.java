package com.dmc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Publication;
import com.dmc.payload.PublicationRequest;
import com.dmc.repo.PublicationRepo;
import com.dmc.service.PublicationService;

@Service
public class PublicationServiceImpl implements PublicationService{
    @Autowired
    private PublicationRepo publicationRepo;

    @Override
    public Publication create(PublicationRequest req, MultipartFile file) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Publication> getAll() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Publication getById(int publicationId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Publication updateById(int publicationId, PublicationRequest req, MultipartFile file) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void deleteById(int publicationId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}