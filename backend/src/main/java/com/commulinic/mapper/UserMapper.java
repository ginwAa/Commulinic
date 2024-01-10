package com.commulinic.mapper;

import com.commulinic.entity.User;
import com.commulinic.entity.dto.PageQueryDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {
    Long update(User user);

    @Insert("insert into user (name, password, role, status, gender, phone, age, address, emergency, email) VALUES " +
            "(#{name}, #{password}, #{role}, #{status}, #{gender}, #{phone}, #{age}, #{address}, #{emergency}, #{email})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    Long add(User user);

    List<User> page(PageQueryDTO<User> dto);


    Long count(User user);

    @Select("select * from user where id = #{id}")
    User getById(Long id);
}
