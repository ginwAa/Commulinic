package com.commulinic.service.impl;

import cn.hutool.core.lang.Assert;
import com.commulinic.entity.Chat;
import com.commulinic.entity.ChatMessage;
import com.commulinic.entity.User;
import com.commulinic.entity.dto.ChatReadDTO;
import com.commulinic.mapper.ChatMessageMapper;
import com.commulinic.mapper.UserMapper;
import com.commulinic.service.ChatMessageService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {
    @Resource
    private ChatMessageMapper chatMessageMapper;
    @Resource
    private UserMapper userMapper;

    @Override
    @Transactional
    public Long add(ChatMessage chatMessage) {
        Long cleared = chatMessageMapper.clearLatestByUserId(chatMessage.getSenderId(), chatMessage.getReceiverId());
        Assert.isTrue(cleared != null && cleared > 0, "发送失败1");
        chatMessage.setStatus(ChatMessage.MESSAGE_STATUS_LATEST);
        Long added = chatMessageMapper.add(chatMessage);
        Assert.isTrue(added != null && added > 0, "发送失败2");
        return added;
    }

    @Override
    public Long update(ChatMessage chatMessage) {
        Long updated = chatMessageMapper.update(chatMessage);
        Assert.isTrue(updated != null && updated > 0, "更新失败");
        return updated;
    }

    @Override
    public Long read(ChatReadDTO dto, Long receiverId) {
        Long updated = chatMessageMapper.readAllByUserIdAndTime(dto.getSenderId(), receiverId, dto.getReadTime());
        Assert.isTrue(updated != null && updated > 0, "更新信息状态失败");
        return updated;
    }

    @Override
    public Long count(ChatMessage chatMessage) {
        Long count = chatMessageMapper.count(chatMessage);
        return count;
    }

    @Override
    public List<Chat> getChatListByUserId(Long receiverId) {
        List<ChatMessage> messages = chatMessageMapper.getDistinctChatByReceiverId(receiverId);
        List<User> users = userMapper.getByIds(messages.stream().map(ChatMessage::getSenderId).toList());
        List<Chat> chats = chatMessageMapper.getUnreadCountByUserIds(users.stream().map(User::getId).toList(), receiverId);
//        chats.stream().map(chat -> {
//
//        })
        return null;
    }

    @Override
    public List<ChatMessage> selectAllByUserId(Long senderId, Long receiverId) {
        return null;
    }
}
