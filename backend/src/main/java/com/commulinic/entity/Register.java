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
    private Integer status;// 1未付费 2已付费 4已结束 8已终止
    private Integer price;
    private Integer section;
    private String userName;
    private String doctorName;
}
