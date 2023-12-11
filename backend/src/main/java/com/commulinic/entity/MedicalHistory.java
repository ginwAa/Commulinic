package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class MedicalHistory implements Serializable {
    private Long id;
    private Long userId;
    private Long doctorId;
    private Date date;
    private String description;
}
