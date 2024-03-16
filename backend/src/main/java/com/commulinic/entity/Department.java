package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Department implements Serializable {
    public final static Integer DEPT_DOCTOR = 1;
    public final static Integer DEPT_ADMIN = 2;
    public final static Long ROOT_DEPT_ID = 1L;
    private Long id;
    private Long parentId;
    private String name;
    private String description;
    private Integer type;
}
