package com.dmc.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dmc.exception.ResourceNotFoundException;
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
        Result result = new Result();

        result.setProgram(req.getProgram());
        result.setTitle(req.getTitle());
        try {
            if(file != null){
                result.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.resultRepo.save(result);
    }

    @Override
    public List<Result> getAll() {
        return this.resultRepo.findAll();
    }

    @Override
    public Result getById(int resultId) {
        return this.resultRepo.findById(resultId).orElseThrow(()->new ResourceNotFoundException("Result not found"));
    }

    @Override
    public Result updateById(int resultId, ResultRequest req, MultipartFile file) {
        Result result = this.getById(resultId);

        result.setProgram(req.getProgram());
        result.setTitle(req.getTitle());
        try {
            if(file != null){
                result.setImg(file.getBytes());
            }
        } catch (IOException ex) {
            System.out.println("Could not save image");
        }

        return this.resultRepo.save(result);
    }

    @Override
    public void deleteById(int resultId) {
        this.resultRepo.delete(this.getById(resultId));
    }
}