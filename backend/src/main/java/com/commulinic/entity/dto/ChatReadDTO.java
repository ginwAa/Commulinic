package com.commulinic.entity.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class ChatReadDTO implements Serializable {
    private Long senderId;
    private LocalDateTime readTime;
}
