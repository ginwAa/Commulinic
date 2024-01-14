package com.commulinic.service.impl;

import com.commulinic.entity.Application;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.ApplicationMapper;
import com.commulinic.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    @Autowired
    private ApplicationMapper applicationMapper;

    @Override
    public PageVO<Application> page(PageQueryDTO<Application> dto) {
        List<Application> records = applicationMapper.page(dto);
        PageVO<Application> res = new PageVO<Application>();
        res.setRecords(records);
        if (dto.getCount()) {
            Long count = applicationMapper.count(dto.getData());
            res.setTotal(count);
        }
        return res;
    }

    @Override
    public Long add(Application application) {
        Long added = applicationMapper.add(application);
        return added;
    }

    @Override
    public Long update(Application application) {
        Long updated = applicationMapper.update(application);
        return updated;
    }

    @Override
    public Long count(Application application) {
        Long count = applicationMapper.count(application);
        return count;
    }
}
