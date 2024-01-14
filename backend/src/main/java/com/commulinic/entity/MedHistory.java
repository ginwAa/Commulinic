package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class MedHistory implements Serializable {
    private Long id;
    private Long userId;
    private Long doctorId;
    private Long date;
    private String description;
}
