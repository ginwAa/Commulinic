package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Announcement implements Serializable {
    private Long id;
    private String description;
    private Integer updated_at;
}
