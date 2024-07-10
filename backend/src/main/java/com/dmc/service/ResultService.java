package com.dmc.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dmc.model.Result;
import com.dmc.payload.ResultRequest;

public interface ResultService{
    public Result create(ResultRequest req, MultipartFile file);

    public List<Result> getAll();


    public Result getById(int resultId);

    public Result updateById(int resultId, ResultRequest req, MultipartFile file);

    public void deleteById(int resultId);
}