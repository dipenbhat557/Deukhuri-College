package com.dmc.payload;

import com.dmc.model.FacultyCategory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacultyRequest{
    private String name;
    private String designation;
    private FacultyCategory category;

}