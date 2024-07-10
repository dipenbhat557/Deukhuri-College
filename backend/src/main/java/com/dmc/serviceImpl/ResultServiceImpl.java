package com.dmc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Result;
import com.dmc.payload.ResultRequest;
import com.dmc.repo.ResultRepo;
import com.dmc.service.ResultService;

@Service
public class ResultServiceImpl implements ResultService{

    @Autowired
    private ResultRepo resultRepo;

    @Override
    public Result create(ResultRequest req, MultipartFile file) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Result> getAll() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Result getById(int resultId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Result updateById(int resultId, ResultRequest req, MultipartFile file) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void deleteById(int resultId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}