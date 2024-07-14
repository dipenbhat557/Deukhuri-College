package com.dmc.payload;

import com.dmc.model.Program;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseRequest{
    private String shortTitle;

    private String fullTitle;

    private String description;

    private Program program;
}