package com.commulinic.mapper;

import com.commulinic.entity.Register;
import com.commulinic.entity.dto.PageQueryDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RegisterMapper {
    List<Register> page(PageQueryDTO<Register> dto);

    @Insert("insert into register (user_id, doctor_id, create_time, date, section, status, price, user_name, doctor_name) values " +
            "(#{userId}, #{doctorId}, #{createTime}, #{date}, #{section}, #{status}, #{price}, #{userName}, #{doctorName})")
    Long add(Register register);

    Long update(Register register);

    Long count(Register register);
}
