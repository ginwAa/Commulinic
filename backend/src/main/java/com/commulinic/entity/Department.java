package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Department implements Serializable {
    private Long id;
    private Long parentId;
    private String name;
    private String description;
}
