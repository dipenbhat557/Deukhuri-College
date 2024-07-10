package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.exception.ResourceNotFoundException;
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
        Publication publication = new Publication();

        publication.setTitle(req.getTitle());
        publication.setProgram(req.getProgram());
        publication.setHidden(req.isHidden());

        try {
            if(file != null){
                publication.setFile(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.publicationRepo.save(publication);
    }

    @Override
    public List<Publication> getAll() {
        return this.publicationRepo.findAll();
    }

    @Override
    public Publication getById(int publicationId) {
        return this.publicationRepo.findById(publicationId).orElseThrow(()->new ResourceNotFoundException("Publication not found"));
    }

    @Override
    public Publication updateById(int publicationId, PublicationRequest req, MultipartFile file) {
        Publication publication = this.getById(publicationId);

        publication.setTitle(req.getTitle());
        publication.setProgram(req.getProgram());
        publication.setHidden(req.isHidden());

        try {
            if(file != null){
                publication.setFile(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.publicationRepo.save(publication);
    }

    @Override
    public void deleteById(int publicationId) {
        this.publicationRepo.delete(this.getById(publicationId));
    }
}