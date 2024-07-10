package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Notice;
import com.dmc.payload.NoticeRequest;

public interface NoticeService{
    public Notice create(NoticeRequest req, MultipartFile file);

    public List<Notice> getAll();

    public Notice getById(int noticeId);

    public Notice updateById(int noticeId, NoticeRequest req, MultipartFile file);

    public void deleteById(int noticeId);
}