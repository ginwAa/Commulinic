package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Application implements Serializable {
    public final static Integer STATUS_WAIT = 1;
    public final static Integer STATUS_PASS = 2;
    public final static Integer STATUS_REJECT = 4;
    public final static Integer STATUS_UNREAD = 8;
    private Long id;
    private Long userId;
    private Long departmentId;
    private String department;
    private String name;
    private String description;
    private String extra;
    private Integer updatedAt;
    private Integer status; // 1申请 2通过 3拒绝
}