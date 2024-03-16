package com.commulinic.entity.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class DoctorRegisterDTO implements Serializable {
    private Long departmentId;
    private String name;
    private Integer gender;
    private Integer section;
    private Integer status;
    private Integer role;
    private Integer beginDate;
    private Integer endDate;
}
