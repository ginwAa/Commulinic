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

    @Select("select id, name, password, role, status, gender, phone, email, age, address, emergency from user where id = #{id}")
    User getById(Long id);

    @Select("select id, name, role, status, gender, phone, email, age, address, emergency from user where phone = #{phone} and password = #{password}")
    User getByLogin(String phone, String password);

    @Select("select id, name, role, status, gender, phone, email, age, address, emergency, password from user where phone = #{phone}")
    User getByPhone(String phone);


}
