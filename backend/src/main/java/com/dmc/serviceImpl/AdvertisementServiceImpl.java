package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.exception.ResourceNotFoundException;
import com.dmc.model.Advertisement;
import com.dmc.repo.AdvertisementRepo;
import com.dmc.service.AdvertisementService;

@Service
public class AdvertisementServiceImpl implements AdvertisementService{

    @Autowired
    private AdvertisementRepo advertisementRepo;

    @Override
    public Advertisement create(MultipartFile file) {
        Advertisement advertisement = new Advertisement();

        try {
            if(file != null){
                advertisement.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }
        return this.advertisementRepo.save(advertisement);
    }

    @Override
    public List<Advertisement> getAll() {
        return this.advertisementRepo.findAll();
    }

    @Override
    public Advertisement getById(int id) {
        return this.advertisementRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("advertisement not found"));
    }

    @Override
    public Advertisement updateById(int id, MultipartFile file) {
        Advertisement advertisement = this.getById(id);

        try {
            if(file != null){
                advertisement.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }
        return this.advertisementRepo.save(advertisement);
    }

    @Override
    public void deleteById(int id) {
        this.advertisementRepo.delete(this.getById(id));
    }
}