package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Doctor implements Serializable {
    private Long id;
    private Long userId;
    private String department;
    private Integer seniority;
    private String position;
    private Integer status;
}
