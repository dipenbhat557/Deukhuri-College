package com.dmc.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.dmc.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(String from, String subject, String messageContent) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("bhattadipen557@gmail.com"); 
        message.setSubject(subject);
        message.setText(messageContent);
        message.setFrom(from);

        mailSender.send(message);
    }
    
}
