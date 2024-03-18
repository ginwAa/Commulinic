package com.commulinic.service;

import com.commulinic.entity.Chat;
import com.commulinic.entity.ChatMessage;
import com.commulinic.entity.dto.ChatReadDTO;

import java.util.List;

public interface ChatMessageService {
    Long add(ChatMessage chatMessage);

    Long update(ChatMessage chatMessage);

    Long read(ChatReadDTO dto, Long receiverId);

    Long count(ChatMessage chatMessage);

    List<Chat> getChatListByUserId(Long receiverId);


    List<ChatMessage> selectAllByUserId(Long senderId, Long receiverId);
}
