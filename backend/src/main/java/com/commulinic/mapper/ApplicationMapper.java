package com.commulinic.mapper;

import com.commulinic.entity.Application;
import com.commulinic.entity.Department;
import com.commulinic.entity.dto.PageQueryDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface ApplicationMapper {

    List<Application> page(PageQueryDTO<Application> dto);

    @Insert("insert into application (user_id, department_id, department, name, description, extra, updated_at, status) " +
            "VALUES (#{userId}, #{departmentId}, #{department}, #{name}, #{description}, #{extra}, #{updatedAt}, #{status})")
    Long add(Application application);

    Long update(Application application);

    Long count(Application application);

    Long updateDepartment(Department department);

    @Update("update application set name = #{userName} where user_id = #{userId}")
    Long updateUserName(Long userId, String userName);

    @Update("update application set status = 1 where status = 8")
    Long read();
}
