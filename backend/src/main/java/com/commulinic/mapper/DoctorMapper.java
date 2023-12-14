package com.commulinic.mapper;

import com.commulinic.entity.Doctor;
import com.commulinic.entity.dto.DoctorPageQueryDTO;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DoctorMapper {
    Page<Doctor> page(DoctorPageQueryDTO dto);

    Long update(Doctor doctor);

    @Insert("insert into doctor (user_id, department_id, department, seniority, status) VALUES (#{userId}, #{departmentId}, #{department}, #{seniority}, #{status})")
    Long add(Doctor doctor);
}
