package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.exception.ResourceNotFoundException;
import com.dmc.model.Event;
import com.dmc.payload.EventRequest;
import com.dmc.repo.EventRepo;
import com.dmc.service.EventService;

@Service
public class EventServiceImpl implements EventService{
    @Autowired
    public EventRepo eventRepo;

    @Override
    public Event create(EventRequest req, MultipartFile file) {
        
        Event event = new Event();

        event.setTitle(req.getTitle());
        event.setDescription(req.getDescription());

        try {
            if(file != null){
                event.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.eventRepo.save(event);
    }

    @Override
    public List<Event> getAll() {
        return this.eventRepo.findAll();
    }

    @Override
    public Event getById(int eventId) {
        return this.eventRepo.findById(eventId).orElseThrow(()->new ResourceNotFoundException("event not found"));
    }

    @Override
    public Event updateById(int eventId, EventRequest req, MultipartFile file) {
        Event event = getById(eventId);

        event.setTitle(req.getTitle());
        event.setDescription(req.getDescription());

        try {
            if(file != null){
                event.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.eventRepo.save(event);
    }

    @Override
    public void deleteById(int eventId) {
        this.eventRepo.delete(getById(eventId));
    }
}