package com.dmc.payload;

import com.dmc.model.Program;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class  SyllabusRequest{
    private String title;
    private Program program;
}