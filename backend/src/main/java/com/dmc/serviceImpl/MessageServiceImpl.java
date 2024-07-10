package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.exception.ResourceNotFoundException;
import com.dmc.model.Message;
import com.dmc.payload.MessageRequest;
import com.dmc.repo.MessageRepo;
import com.dmc.service.MessageService;

@Service
public class MessageServiceImpl implements MessageService{

    @Autowired
    private MessageRepo messageRepo;

    @Override
    public Message create(MessageRequest req, MultipartFile file) {
        Message message = new Message();

        message.setMessage(req.getMessage());
        message.setDesignation(req.getDesignation());
        message.setName(req.getName());
         try {
            if(file != null){
                message.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.messageRepo.save(message);
    }

    @Override
    public List<Message> getAll() {
        return this.messageRepo.findAll();
    }

    @Override
    public Message getById(int messageId) {
        return this.messageRepo.findById(messageId).orElseThrow(()->new ResourceNotFoundException("Message not found"));
    }

    @Override
    public Message updateById(int messageId, MessageRequest req, MultipartFile file) {
        Message message = getById(messageId);

        message.setMessage(req.getMessage());
        message.setDesignation(req.getDesignation());
        message.setName(req.getName());
         try {
            if(file != null){
                message.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.messageRepo.save(message);

    }

    @Override
    public void deleteById(int messageId) {
        this.messageRepo.delete(getById(messageId));
    }
}