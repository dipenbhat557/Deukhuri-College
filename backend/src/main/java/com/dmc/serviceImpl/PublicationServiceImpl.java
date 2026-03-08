package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.exception.ResourceNotFoundException;
import com.dmc.model.Publication;
import com.dmc.payload.PublicationResponse;
import com.dmc.repo.PublicationRepo;
import com.dmc.service.PublicationService;

@Service
public class PublicationServiceImpl implements PublicationService {
    @Autowired
    private PublicationRepo publicationRepo;

    @Override
    public Publication create(String title, String type, MultipartFile file) {
        Publication publication = new Publication();

        publication.setTitle(title);
        if (type != null && !type.isBlank()) {
            publication.setType(type.trim());
        }

        try {
            if (file != null && !file.isEmpty()) {
                publication.setFile(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save file");
        }

        return this.publicationRepo.save(publication);
    }

    @Override
    public List<PublicationResponse> getAll() {
        return this.publicationRepo.findAllPublicationResponses();
    }

    @Override
    public byte[] getFileById(int publicationId) {
        return this.getById(publicationId).getFile();
    }

    @Override
    public Publication getById(int publicationId) {
        return this.publicationRepo.findById(publicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Publication not found"));
    }

    @Override
    public Publication updateById(int publicationId, String title, String type, MultipartFile file) {
        Publication publication = this.getById(publicationId);

        publication.setTitle(title);
        if (type != null && !type.isBlank()) {
            publication.setType(type.trim());
        }

        try {
            if (file != null && !file.isEmpty()) {
                publication.setFile(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save file");
        }

        return this.publicationRepo.save(publication);
    }

    @Override
    public void deleteById(int publicationId) {
        this.publicationRepo.delete(this.getById(publicationId));
    }
}