package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Doctor implements Serializable {
    public final static Integer DOCTOR_STATUS_ABSENT = 1;
    public final static Integer DOCTOR_STATUS_ACTIVE = 2;
    public final static Integer DOCTOR_STATUS_ABORTED = 4;
    private Long id;
    private Long userId;
    private Long departmentId;
    private String department;
    private Integer seniority;
    private String position;
    private Integer status; // 1 absent 2 active 4 aborted
    private Integer amStd;
    private Integer pmStd;
    private String description;
}
