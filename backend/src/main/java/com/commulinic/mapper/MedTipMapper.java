package com.commulinic.mapper;

import com.commulinic.entity.MedTip;
import com.commulinic.entity.dto.PageQueryDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface MedTipMapper {
    List<MedTip> page(PageQueryDTO<MedTip> dto);

    @Insert("insert into medical_tip (description, updated_at) values (#{description}, #{updated_at} )")
    Long add(MedTip tip);

    @Update("update medical_tip set description = #{description}, updated_at = #{updated_at} where id = #{id}")
    Long update(MedTip tip);

    Long count(PageQueryDTO<MedTip> dto);
}
