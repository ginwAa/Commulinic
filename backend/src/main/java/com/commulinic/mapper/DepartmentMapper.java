package com.commulinic.mapper;

import com.commulinic.entity.Department;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DepartmentMapper {
    @Select("select * from department order by parent_id < 0, parent_id IS NULL, parent_id")
    List<Department> all();

    @Insert("insert into department (parent_id, name, description) values (#{parentId}, #{name}, #{description})")
    Long add(Department department);

    Long update(Department department);

    @Delete("delete from department where id = #{id}")
    Long delete(Long id);

    @Select("select * from department where id = #{id}")
    Department getById(Long id);

}
