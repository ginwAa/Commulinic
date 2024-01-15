package com.commulinic.mapper;

import com.commulinic.entity.Department;
import com.commulinic.entity.Doctor;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.DoctorVO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface DoctorMapper {
    List<DoctorVO> page(PageQueryDTO<DoctorVO> dto);

    Long update(Doctor doctor);

    @Insert("insert into doctor (user_id, department_id, department, seniority, status, position, morning_begin, morning_end, afternoon_begin, afternoon_end) " +
            "VALUES (#{userId}, #{departmentId}, #{department}, #{seniority}, #{status}, #{position}, #{morningBegin}, #{morningEnd}, #{afternoonBegin}, #{afternoonEnd})")
    Long add(Doctor doctor);

    Long count(DoctorVO dto);

    @Select("select * from doctor where id = #{id}")
    Doctor getById(Long id);

    @Update("update doctor set department = #{department} where department_id = #{id}")
    Long updateDepartment(Department department);
}
