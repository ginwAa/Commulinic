package com.commulinic.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Chat implements Serializable {
    private Long id;
    private Long receiverId;
    private Long senderId;
    private String senderName;
    private Long revId;
    private Integer unreadCount;
    private ChatMessage lastMessage;
}
