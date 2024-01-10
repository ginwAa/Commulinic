package com.commulinic.mapper;

import com.commulinic.entity.Register;
import com.commulinic.entity.dto.RegisterPageQueryDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RegisterMapper {
    List<Register> page(RegisterPageQueryDTO dto);

    @Insert("insert into register (user_id, doctor_id, create_time, date, section, status, price) values " +
            "(#{userId}, #{doctorId}, #{createTime}, #{date}, #{section}, #{status}, #{price})")
    Long add(Register register);

    Long update(Register register);
}
