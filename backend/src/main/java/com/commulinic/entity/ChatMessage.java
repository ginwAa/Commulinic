package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class ChatMessage implements Serializable {
    public final static Integer MESSAGE_STATUS_READ = 1;
    public final static Integer MESSAGE_STATUS_UNREAD = 2;
    public final static Integer MESSAGE_STATUS_LATEST = 4;
    private Long id;
    private Long senderId;
    private Long receiverId;
    private String content;
    private Integer status;
    private LocalDateTime sendTime;
}
