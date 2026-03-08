package com.dmc.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicationResponse {
    private Integer id;
    private String title;
    private String type;
    private boolean hidden;
}
