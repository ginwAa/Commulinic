package com.commulinic.entity.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class RegisterPageQueryDTO implements Serializable {
    private Long id;
    private Long userId;
    private Long doctorId;
    private Long beginCreateTime;
    private Long endCreateTime;
    private Long beginDate;
    private Long endDate;
    private Integer minPrice;
    private Integer maxPrice;
    private Integer status;
    private Integer section;
    private Integer page;
    private Integer pageSize;
}
