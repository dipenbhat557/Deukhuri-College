package com.dmc.service;

public interface EmailService {
    public void sendEmail(String from, String subject, String messageContent);
}
