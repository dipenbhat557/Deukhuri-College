package com.dmc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Statute;
import com.dmc.payload.StatuteRequest;
import com.dmc.repo.StatuteRepo;
import com.dmc.service.StatuteService;

@Service
public class StatuteServiceImpl implements StatuteService{

    @Autowired
    private StatuteRepo statuteRepo;

    @Override
    public Statute create(StatuteRequest req, MultipartFile file) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Statute> getAll() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Statute getById(int statuteId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Statute updateById(int statuteId, StatuteRequest req, MultipartFile file) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void deleteById(int statuteId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}