package com.dmc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dmc.model.Subscribed;
import com.dmc.repo.SubscribedRepo;
import com.dmc.service.SubscribedService;

@Service
public class SubscribedServiceImpl implements SubscribedService{

    @Autowired
    private SubscribedRepo subscribedRepo;

    @Override
    public Subscribed create(String email) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Subscribed> getAll() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Subscribed getById(int subscribedId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Subscribed updateById(int subscribedId, String email) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void deleteById(int subscribedId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}