package com.commulinic.mapper;

import com.commulinic.entity.MedTip;
import com.commulinic.entity.dto.PageQueryDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MedTipMapper {
    List<MedTip> page(PageQueryDTO<MedTip> dto);

    @Insert("insert into medical_tip (content, title, updated_at) values (#{description}, #{title}, #{updated_at} )")
    Long add(MedTip tip);

    Long update(MedTip tip);

    Long count(PageQueryDTO<MedTip> dto);
}
