package com.commulinic.mapper;

import com.commulinic.entity.SystemDict;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface SystemDictMapper {
    @Insert("insert into system_dict(`key`, value) values(#{key}, #{value})")
    Long add(SystemDict v);

    @Update("update system_dict set value = #{value} where `key` = #{id}")
    Long update(SystemDict v);

    @Select("select * from system_dict where `key` = #{id}")
    SystemDict getById(String id);
}
