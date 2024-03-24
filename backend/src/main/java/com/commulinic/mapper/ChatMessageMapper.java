package com.commulinic.mapper;

import com.commulinic.entity.Chat;
import com.commulinic.entity.ChatMessage;
import org.apache.ibatis.annotations.*;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface ChatMessageMapper {

    @Insert("insert into chat_message (chat_id, content, create_time, status)" +
            " VALUES (#{chatId}, #{content}, #{createTime}, #{status})")
    Long add(ChatMessage chatMessage);

    @Options(useGeneratedKeys = false, keyProperty = "id")
    Long update(ChatMessage chatMessage);

    Long count(ChatMessage chatMessage);

    List<Chat> countUnreadByChatIds(List<Long> chatIds);

    List<ChatMessage> selectNewestByChatIds(List<Long> chatIds);

    @Update("update chat_message set status = 1 where chat_id = #{chatId} and create_time < #{createTime}")
    Long readByChat(Long chatId, LocalDateTime createTime);

    @Select("select * from chat_message where chat_id = #{id} or chat_id = #{revId} order by create_time desc")
    List<ChatMessage> selectByChat(Chat chat);

}
