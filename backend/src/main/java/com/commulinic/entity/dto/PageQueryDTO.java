package com.commulinic.entity.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class PageQueryDTO<T> implements Serializable {
    T data;
    Integer offset;
    Integer size;
    Boolean count;
}
