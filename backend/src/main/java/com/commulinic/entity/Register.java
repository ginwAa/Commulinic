package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Register implements Serializable {
    private Long id;
    private Long userId;
    private Long doctorId;
    private Long createTime;
    private Long date;
    private Integer status;
    private Integer price;
    private Integer section;
}
