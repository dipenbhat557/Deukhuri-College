package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.exception.ResourceNotFoundException;
import com.dmc.model.Statute;
import com.dmc.payload.StatuteRequest;
import com.dmc.repo.StatuteRepo;
import com.dmc.service.StatuteService;

@Service
public class StatuteServiceImpl implements StatuteService{

    @Autowired
    private StatuteRepo statuteRepo;

    @Override
    public Statute create(StatuteRequest req, MultipartFile file) {
        Statute statute = new Statute();

        statute.setProgram(req.getProgram());
        statute.setTitle(req.getTitle());

        try {
            if(file != null){
                statute.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.statuteRepo.save(statute);
    }

    @Override
    public List<Statute> getAll() {
        return this.statuteRepo.findAll();
    }

    @Override
    public Statute getById(int statuteId) {
        return this.statuteRepo.findById(statuteId).orElseThrow(()->new ResourceNotFoundException("Statute not found"));
    }

    @Override
    public Statute updateById(int statuteId, StatuteRequest req, MultipartFile file) {
        Statute statute = this.getById(statuteId);

        statute.setProgram(req.getProgram());
        statute.setTitle(req.getTitle());

        try {
            if(file != null){
                statute.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.statuteRepo.save(statute);
    }

    @Override
    public void deleteById(int statuteId) {
        this.statuteRepo.delete(this.getById(statuteId));
    }
}