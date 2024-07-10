package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Statute;
import com.dmc.payload.StatuteRequest;

public interface StatuteService{
    public Statute create(StatuteRequest req, MultipartFile file);

    public List<Statute> getAll();

    public Statute getById(int statuteId);

    public Statute updateById(int statuteId, StatuteRequest req, MultipartFile file);

    public void deleteById(int statuteId);
}