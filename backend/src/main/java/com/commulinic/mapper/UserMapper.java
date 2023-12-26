package com.commulinic.mapper;

import com.commulinic.entity.User;
import com.commulinic.entity.dto.UserPageQueryDTO;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface UserMapper {
    Long update(User user);

    @Insert("insert into user (name, password, role, status, gender, phone, age, address, emergency, email) VALUES " +
            "(#{name}, #{password}, #{role}, #{status}, #{gender}, #{phone}, #{age}, #{address}, #{emergency}, #{email})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    Long add(User user);

    Page<User> page(UserPageQueryDTO userPageQueryDTO);


    Long count(UserPageQueryDTO userPageQueryDTO);
}
