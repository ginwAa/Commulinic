package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class MedTip implements Serializable {
    private Long id;
    private String title;
    private String content;
    private Integer updatedAt;
}
