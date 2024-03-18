package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Chat implements Serializable {
    private Long userId;
    private String userName;
    private Integer unreadCount;
    private ChatMessage lastMessage;
}
