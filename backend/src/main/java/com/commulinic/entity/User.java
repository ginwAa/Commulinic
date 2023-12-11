package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {
    private Long id;
    private String name;
    private String password;
    private String address;
    private Integer gender; // 1 male 2 female
    private Integer status; // 1 active 2 frozen
    private Integer role; // 1 admin 2 doctor 3 normal
    private String phone;
    private Integer age;
    private String emergency;
}
