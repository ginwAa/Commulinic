package com.commulinic.entity.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserPageQueryDTO implements Serializable {
    private Long id;
    private String name;
    private String address;
    private String email;
    private Integer gender; // 1 male 2 female
    private Integer status; // 1 active 2 frozen
    private Integer role; // 1 admin 2 doctor 4 normal
    private String phone;
    private Integer age;
    private String emergency;
    private Integer page;
    private Integer pageSize;
}
