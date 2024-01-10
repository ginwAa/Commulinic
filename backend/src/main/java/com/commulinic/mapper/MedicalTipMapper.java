package com.commulinic.mapper;

import com.commulinic.entity.MedicalTip;
import com.commulinic.entity.dto.MedicalTipPageQueryDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface MedicalTipMapper {
    List<MedicalTip> page(MedicalTipPageQueryDTO dto);

    @Insert("insert into medical_tip (description) values (#{description} )")
    Long add(String description);

    @Update("update medical_tip set description = #{description} where id = #{id}")
    Long update(MedicalTip tip);
}
