package com.commulinic.mapper;

import com.commulinic.entity.MedTip;
import com.commulinic.entity.dto.PageQueryDTO;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MedTipMapper {
    List<MedTip> page(PageQueryDTO<MedTip> dto);

    @Insert("insert into medical_tip (content, title, updated_at) values (#{content}, #{title}, #{updatedAt} )")
    Long add(MedTip tip);

    Long update(MedTip tip);

    Long count(MedTip dto);

    @Delete("delete from medical_tip where id = #{id}")
    Long delete(MedTip tip);
}
