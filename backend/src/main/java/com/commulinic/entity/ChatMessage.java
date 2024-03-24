package com.commulinic.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class ChatMessage implements Serializable {
    public final static Integer MESSAGE_STATUS_READ = 1;
    public final static Integer MESSAGE_STATUS_UNREAD = 2;
    private Long id;
    private Long chatId;
    private String content;
    private Integer status;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
    private Integer byMe;
}
