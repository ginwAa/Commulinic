package com.commulinic.entity.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class UserPageQueryDTO implements Serializable {
    private Long id;
    private String name;
    private String address;
    private List<Integer> gender; // 1 male 2 female
    private List<Integer> status; // 1 active 2 frozen
    private List<Integer> role; // 1 admin 2 doctor 3 normal
    private String phone;
    private Integer age;
    private String emergency;
    private Integer page;
    private Integer pageSize;
}
