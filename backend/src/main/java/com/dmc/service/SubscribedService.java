package com.dmc.service;

import java.util.List;

import com.dmc.model.Subscribed;

public interface SubscribedService{
    public Subscribed create(String email);

    public List<Subscribed> getAll();


    public Subscribed getById(int subscribedId);

    public Subscribed updateById(int subscribedId, String email);

    public void deleteById(int subscribedId);
}