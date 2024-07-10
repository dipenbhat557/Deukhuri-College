package com.dmc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dmc.exception.ResourceNotFoundException;
import com.dmc.model.Subscribed;
import com.dmc.repo.SubscribedRepo;
import com.dmc.service.SubscribedService;

@Service
public class SubscribedServiceImpl implements SubscribedService{

    @Autowired
    private SubscribedRepo subscribedRepo;

    @Override
    public Subscribed create(String email) {
        Subscribed subscribed = new Subscribed();

        subscribed.setEmail(email);

        return this.subscribedRepo.save(subscribed);
    }

    @Override
    public List<Subscribed> getAll() {
        return this.subscribedRepo.findAll();
    }

    @Override
    public Subscribed getById(int subscribedId) {
        return this.subscribedRepo.findById(subscribedId).orElseThrow(()->new ResourceNotFoundException("Subscribtion not found"));
    }

    @Override
    public Subscribed updateById(int subscribedId, String email) {
        Subscribed subscribed = this.getById(subscribedId);

        subscribed.setEmail(email);

        return this.subscribedRepo.save(subscribed);
    }

    @Override
    public void deleteById(int subscribedId) {
        this.subscribedRepo.delete(this.getById(subscribedId));
    }
}