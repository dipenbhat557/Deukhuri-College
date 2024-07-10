package com.dmc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Message> getAll() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Message getById(int messageId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Message updateById(int messageId, MessageRequest req, MultipartFile file) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void deleteById(int messageId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}