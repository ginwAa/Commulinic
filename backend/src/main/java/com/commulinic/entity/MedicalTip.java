package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class MedicalTip implements Serializable {
    private Long id;
    private String description;
}
