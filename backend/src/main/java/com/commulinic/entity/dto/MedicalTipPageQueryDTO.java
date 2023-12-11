package com.commulinic.entity.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class MedicalTipPageQueryDTO implements Serializable {
    private Long id;
    private String description;
    private Integer page;
    private Integer pageSize;
}
