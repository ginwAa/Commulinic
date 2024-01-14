package com.commulinic.mapper;

import com.commulinic.entity.Application;
import com.commulinic.entity.dto.PageQueryDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ApplicationMapper {

    List<Application> page(PageQueryDTO<Application> dto);

    Long add(Application application);

    Long update(Application application);

    Long count(Application application);
}
