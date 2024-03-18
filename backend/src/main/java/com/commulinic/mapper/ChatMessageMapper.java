package com.commulinic.mapper;

import com.commulinic.entity.Chat;
import com.commulinic.entity.ChatMessage;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface ChatMessageMapper {
    @Insert("insert into chat_message (sender_id, receiver_id, content, create_time, status) VALUES " +
            "(#{senderId}, #{receiverId}, #{content}, #{createTime}, #{status})")
    Long add(ChatMessage chatMessage);

    Long update(ChatMessage chatMessage);

    Long count(ChatMessage chatMessage);

    ChatMessage selectAllByUserId(Long senderId, Long receiverId);

    List<ChatMessage> selectAllLatestMessage(Long receiverId);

    List<ChatMessage> getDistinctChatByReceiverId(Long receiverId);

    @Update("update chat_message set status = 2 where sender_id = #{senderId} and receiver_id = #{receiverId} and status = 4")
    Long clearLatestByUserId(Long senderId, Long receiverId);

    @Update("update chat_message set status = 1 where sender_id = #{senderId} and receiver_id = #{receiverId} " +
            "and status & 6 != 0 and create_time <= #{time}")
    Long readAllByUserIdAndTime(Long senderId, Long receiverId, LocalDateTime time);

    List<Chat> getUnreadCountByUserIds(List<Long> senderIds, Long receiverId);
}
