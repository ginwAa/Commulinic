package com.commulinic.entity.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class DoctorVO implements Serializable {
    private Long id;
    private Long userId;
    private Long departmentId;
    private String department;
    private Integer seniority;
    private String position;
    private Integer status;
    private String name;
    private Integer gender;
    private String phone;
    private String email;
}
