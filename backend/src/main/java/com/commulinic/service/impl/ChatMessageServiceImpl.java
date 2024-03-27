package com.commulinic.service.impl;

import cn.hutool.core.lang.Assert;
import com.commulinic.entity.Chat;
import com.commulinic.entity.ChatMessage;
import com.commulinic.mapper.ChatMapper;
import com.commulinic.mapper.ChatMessageMapper;
import com.commulinic.service.ChatMessageService;
import com.commulinic.util.SecurityUtil;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {
    @Resource
    private ChatMessageMapper chatMessageMapper;
    @Resource
    private ChatMapper chatMapper;

    @Override
    @Transactional
    public Long add(ChatMessage chatMessage) {
        chatMessage.setCreateTime(LocalDateTime.now());
        Long added = chatMessageMapper.add(chatMessage);
        Assert.isTrue(added != null && added > 0, "发送失败");
        return added;
    }

    @Override
    @Transactional
    public Long update(ChatMessage chatMessage) {
        Long updated = chatMessageMapper.update(chatMessage);
        Assert.isTrue(updated != null && updated > 0, "更新失败");
        return updated;
    }

    @Override
    @Transactional
    public Long read(Long chatId, LocalDateTime time) {
        Long updated = chatMessageMapper.readByChat(chatId, time);
        Assert.isTrue(updated != null && updated > 0, "更新信息状态失败");
        return updated;
    }

    @Override
    public List<Chat> getChatListByUserId(Long receiverId) {
        List<Chat> chats = chatMapper.selectAllByReceiver(receiverId);
        if (chats.isEmpty()) {
            return chats;
        }
        List<ChatMessage> newest = chatMessageMapper.selectNewestByChatIds(chats.stream().map(Chat::getId).toList());
        List<Chat> unread = chatMessageMapper.countUnreadByChatIds(chats.stream().map(Chat::getId).toList());
        chats.forEach(chat -> {
            chat.setLastMessage(newest.stream().filter(msg -> msg.getChatId().equals(chat.getId())).findFirst().orElse(null));
            chat.setUnreadCount(unread.stream().filter(msg -> msg.getId().equals(chat.getId())).findFirst().map(Chat::getUnreadCount).orElse(null));
        });
        return chats;
    }

    @Override
    public List<ChatMessage> selectByChat(Chat chat) {
        List<ChatMessage> messages = chatMessageMapper.selectByChat(chat);
        messages.forEach(msg -> {
            msg.setByMe(msg.getChatId().equals(chat.getId()) ? 0 : 1);
        });
        return messages;
    }

    @Override
    @Transactional
    public Long addChat(Chat chat) {
        Long prev = chatMapper.selectByUser(chat.getSenderId(), chat.getReceiverId());
        if (prev != null && prev > 0) {
            return prev;
        }
        chat.setRevId(0L);
        Long added = chatMapper.add(chat);
        Assert.isTrue(added != null && added > 0, "操作失败1" + added);
        added = chatMapper.selectByUser(chat.getSenderId(), chat.getReceiverId());
        Assert.isTrue(added != null && added > 0, "操作失败4" + added);
        chat.setId(added);

        Chat revChat = new Chat();
        revChat.setReceiverId(chat.getSenderId());
        revChat.setSenderId(chat.getReceiverId());
        revChat.setSenderName(SecurityUtil.getUserName());
        revChat.setRevId(added);
        added = chatMapper.add(revChat);
        Assert.isTrue(added != null && added > 0, "操作失败5" + added);
        added = chatMapper.selectByUser(revChat.getSenderId(), revChat.getReceiverId());
        chat.setRevId(added);
        Long updated = chatMapper.update(chat);
        Assert.isTrue(updated != null && updated > 0, "操作失败2" + updated);
        Assert.isTrue(added != null && added > 0, "操作失败3" + added);
        return added;
    }

    @Override
    @Transactional
    public Long updateChat(Chat chat) {
        Long updated = chatMapper.update(chat);
        Assert.isTrue(updated != null && updated > 0, "更新失败");
        return updated;
    }


    @Override
    public Long count(ChatMessage chatMessage) {
        return null;
    }
}
