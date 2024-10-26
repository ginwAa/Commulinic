package com.commulinic.mapper;

import com.commulinic.entity.Chat;
import org.apache.ibatis.annotations.*;

import java.util.List;


@Mapper
public interface ChatMapper {
    @Insert("insert into chat (sender_id, receiver_id, sender_name, rev_id) " +
            "VALUES (#{senderId}, #{receiverId}, #{senderName}, #{revId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    Long add(Chat chat);

    Long update(Chat chat);

    List<Chat> selectAllByReceiver(Long userId);

    Long countByReceiver(Long userId);

    @Update("update chat set sender_name = #{name} where sender_id = #{senderId}")
    Long updateByUsername(String name, Long senderId);

    @Select("select id from chat where sender_id = #{senderId} and receiver_id = #{receiverId}")
    Long selectByUser(Long senderId, Long receiverId);

//    @Select("select id from chat where sender_id = #{senderId} and receiver_id = #{receiverId}")
//    Long selectByUserId(Chat chat);
}

// 查列表 1最新未读 2未读数
