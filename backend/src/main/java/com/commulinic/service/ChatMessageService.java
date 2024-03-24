package com.commulinic.service;

import com.commulinic.entity.Chat;
import com.commulinic.entity.ChatMessage;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatMessageService {
    Long add(ChatMessage chatMessage);

    Long addChat(Chat chat);

    Long updateChat(Chat chat);

    Long update(ChatMessage chatMessage);

    /**
     * 读全部
     *
     * @param chatId
     * @param time
     * @return
     */
    Long read(Long chatId, LocalDateTime time);

    Long count(ChatMessage chatMessage);

    /**
     * 获取聊天列表
     * @param receiverId
     * @return
     */
    List<Chat> getChatListByUserId(Long receiverId);

    /**
     * 获取某一个聊天的所有信息
     * @param chat
     * @return
     */

    List<ChatMessage> selectByChat(Chat chat);
}
