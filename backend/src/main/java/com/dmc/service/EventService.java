package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Event;
import com.dmc.payload.EventRequest;

public interface EventService{
    public Event create(EventRequest req, MultipartFile file);

    public List<Event> getAll();


    public Event getById(int eventId);

    public Event updateById(int eventId, EventRequest req, MultipartFile file);

    public void deleteById(int eventId);
}