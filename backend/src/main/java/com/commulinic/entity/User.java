package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {
    public final static Integer GENDER_MALE = 1;
    public final static Integer GENDER_FEMALE = 2;
    public final static Integer ROLE_ADMIN = 1;
    public final static Integer ROLE_DOCTOR = 2;
    public final static Integer ROLE_NORMAL = 4;
    public final static Integer STATUS_ACTIVE = 1;
    public final static Integer STATUS_FROZEN = 2;
    private Long id;
    private String name;
    private String password;
    private String address;
    private Integer gender; // 1 male 2 female
    private Integer status; // 1 normal 2 frozen
    private Integer role; // 1 admin 2 doctor 4 normal
    private String phone;
    private String email;
    private Integer age;
    private String emergency;
}
