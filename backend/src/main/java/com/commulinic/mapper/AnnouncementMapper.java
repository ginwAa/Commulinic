package com.commulinic.mapper;

import com.commulinic.entity.Announcement;
import com.commulinic.entity.dto.PageQueryDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface AnnouncementMapper {
    List<Announcement> page(PageQueryDTO<Announcement> dto);

    Long count(Announcement announcement);

    @Update("update announcemont set description = #{description}, updated_at = #{updatedAt} where id = #{id}")
    Long update(Announcement announcement);

    @Insert("insert into announcemont (description, updated_at) VALUES (#{description}, #{updatedAt})")
    Long add(Announcement announcement);
}
