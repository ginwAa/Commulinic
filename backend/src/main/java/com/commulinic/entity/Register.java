package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class Register implements Serializable {
    private Long id;
    private Long userId;
    private Long doctorId;
    private Date createTime;
    private Date date;
    private Integer section;
}
