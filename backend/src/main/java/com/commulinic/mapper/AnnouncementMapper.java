package com.commulinic.mapper;

import com.commulinic.entity.Announcement;
import com.commulinic.entity.dto.PageQueryDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AnnouncementMapper {
    List<Announcement> page(PageQueryDTO<Announcement> dto);

    Long count(Announcement announcement);

    Long update(Announcement announcement);

    @Insert("insert into announcemont (content, updated_at, title) VALUES (#{description}, #{updatedAt}, #{title} )")
    Long add(Announcement announcement);
}
