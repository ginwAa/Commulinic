package com.commulinic.mapper;

import com.commulinic.entity.Announcement;
import com.commulinic.entity.dto.PageQueryDTO;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface AnnouncementMapper {
    List<Announcement> page(PageQueryDTO<Announcement> dto);

    Long count(Announcement announcement);

    Long update(Announcement announcement);

    @Insert("insert into announcemont (content, updated_at, title) VALUES (#{content}, #{updatedAt}, #{title} )")
    Long add(Announcement announcement);

    @Delete("delete from announcemont where id = #{id}")
    Long delete(Announcement announcement);
}
