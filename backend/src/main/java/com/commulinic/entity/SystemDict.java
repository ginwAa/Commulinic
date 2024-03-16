package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class SystemDict implements Serializable {
    public final static String HOSPITAL_NAME = "HOSPITAL_NAME";
    public final static String INTRODUCTION_TEXT = "INTRODUCTION_TEXT";
    private String key;
    private String value;
}
