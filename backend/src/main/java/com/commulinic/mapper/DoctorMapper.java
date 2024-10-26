package com.commulinic.mapper;

import com.commulinic.entity.Department;
import com.commulinic.entity.Doctor;
import com.commulinic.entity.dto.DoctorRegisterDTO;
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

    List<DoctorVO> pageWithStock(PageQueryDTO<DoctorRegisterDTO> dto, Integer aSection);

    Long countWithStock(DoctorRegisterDTO dto, Integer aSection);

    Long update(Doctor doctor);

    @Insert("insert into doctor (user_id, department_id, department, seniority, status, position, am_std, pm_std, description) " +
            "VALUES (#{userId}, #{departmentId}, #{department}, #{seniority}, #{status}, #{position}, #{amStd}, #{pmStd}, #{description})")
    Long add(Doctor doctor);

    Long count(DoctorVO dto);

    @Select("select * from doctor where id = #{id}")
    Doctor getById(Long id);


    @Select("select * from doctor where user_id = #{id}")
    Doctor getByUserId(Long id);

    @Update("update doctor set department = #{name} where department_id = #{id}")
    Long updateDepartment(Department department);
}
