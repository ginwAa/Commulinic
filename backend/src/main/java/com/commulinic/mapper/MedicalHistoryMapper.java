package com.commulinic.mapper;

import com.commulinic.entity.MedicalHistory;
import com.commulinic.entity.dto.MedicalHistoryPageQueryDTO;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MedicalHistoryMapper {
    Page<MedicalHistory> page(MedicalHistoryPageQueryDTO dto);

    Long update(MedicalHistory history);

    @Insert("insert into medical_history (user_id, doctor_id, date, description) values (#{userId}, #{doctorId}, #{date}, #{description})")
    Long add(MedicalHistory history);
}
