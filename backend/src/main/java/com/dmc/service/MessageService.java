package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Message;
import com.dmc.payload.MessageRequest;

public interface MessageService{
    public Message create(MessageRequest req, MultipartFile file);

    public List<Message> getAll();


    public Message getById(int messageId);

    public Message updateById(int messageId, MessageRequest req, MultipartFile file);

    public void deleteById(int messageId);
}