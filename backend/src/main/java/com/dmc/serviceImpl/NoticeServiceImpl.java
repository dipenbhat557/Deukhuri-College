package com.dmc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Notice;
import com.dmc.payload.NoticeRequest;
import com.dmc.repo.NoticeRepo;
import com.dmc.service.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService{

    @Autowired
    private NoticeRepo noticeRepo;

    @Override
    public Notice create(NoticeRequest req, MultipartFile file) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Notice> getAll() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Notice getById(int courseId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Notice updateById(int courseId, NoticeRequest req, MultipartFile file) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void deleteById(int courseId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}