package com.commulinic.mapper;

import com.commulinic.entity.Doctor;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.DoctorVO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DoctorMapper {
    List<DoctorVO> page(PageQueryDTO<DoctorVO> dto);

    Long update(Doctor doctor);

    @Insert("insert into doctor (user_id, department_id, seniority, status, position) VALUES (#{userId}, #{departmentId}, #{seniority}, #{status}, #{position})")
    Long add(Doctor doctor);

    Long count(DoctorVO dto);

    @Select("select * from doctor where id = #{id}")
    Doctor getById(Long id);
}
