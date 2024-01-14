package com.commulinic.mapper;

import com.commulinic.entity.MedHistory;
import com.commulinic.entity.dto.PageQueryDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MedHistoryMapper {
    List<MedHistory> page(PageQueryDTO<MedHistory> dto);

    Long update(MedHistory history);

    @Insert("insert into medical_history (user_id, doctor_id, date, description) values (#{userId}, #{doctorId}, #{date}, #{description})")
    Long add(MedHistory history);
}
