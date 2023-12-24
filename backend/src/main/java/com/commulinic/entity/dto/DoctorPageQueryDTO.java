package com.commulinic.entity.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class DoctorPageQueryDTO implements Serializable {
    private Long id;
    private Long userId;
    private Long departmentId;
    private String department;
    private Integer seniority;
    private List<Integer> status;
    private Integer page;
    private Integer pageSize;
}
