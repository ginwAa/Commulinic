package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Application implements Serializable {
    private Long id;
    private Long userId;
    private Long departmentId;
    private String name;
    private String description;
    private String extra;
    private Integer updateAt;
    private Integer status;
}
