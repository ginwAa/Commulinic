package com.commulinic.entity.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class MedicalHistoryPageQueryDTO implements Serializable {
    private Long id;
    private Long userId;
    private Long doctorId;
    private Long beginDate;
    private Long endDate;
    private String description;
    private Integer page;
    private Integer pageSize;
}
