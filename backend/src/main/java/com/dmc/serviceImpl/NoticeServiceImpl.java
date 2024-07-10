package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.exception.ResourceNotFoundException;
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
        Notice notice = new Notice();

        notice.setTitle(req.getTitle());
        notice.setHeader(req.isHeader());

        try {
            if(file != null){
                notice.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }
        return this.noticeRepo.save(notice);
    }

    @Override
    public List<Notice> getAll() {
        return this.noticeRepo.findAll();
    }

    @Override
    public Notice getById(int noticeId) {
        return this.noticeRepo.findById(noticeId).orElseThrow(()-> new ResourceNotFoundException("Notice not found"));
    }

    @Override
    public Notice updateById(int noticeId, NoticeRequest req, MultipartFile file) {
        Notice notice =  this.getById(noticeId);

        notice.setTitle(req.getTitle());
        notice.setHeader(req.isHeader());

        try {
            if(file != null){
                notice.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }
        return this.noticeRepo.save(notice);
    }

    @Override
    public void deleteById(int noticeId) {
        this.noticeRepo.delete(getById(noticeId));    
    }
}