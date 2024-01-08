package com.commulinic.entity.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class DepartmentPageQueryDTO implements Serializable {
    private Long id;
    private String name;
    private String description;
    private Long parentId;
    private Integer page;
    private Integer pageSize;
}
