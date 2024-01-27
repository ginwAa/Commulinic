package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Register implements Serializable {
    public final static Integer STATUS_UNPAID = 1;
    public final static Integer STATUS_PAID = 2;
    public final static Integer STATUS_FINISHED = 4;
    public final static Integer STATUS_ABORTED = 8;
    public final static Integer SECTION_MORNING = 1;
    public final static Integer SECTION_AFTERNOON = 2;
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
