package com.commulinic.entity.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class DoctorPageQueryDTO implements Serializable {
    private Long id;
    private Long userId;
    private Long departmentId;
    private String department;
    private Integer seniority;
    private Integer status;
    private Integer page;
    private Integer pageSize;
}
