package com.commulinic.service.impl;

import cn.hutool.core.lang.Assert;
import com.commulinic.entity.SystemDict;
import com.commulinic.mapper.SystemDictMapper;
import com.commulinic.service.SystemDictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SystemDictServiceImpl implements SystemDictService {
    @Autowired
    private SystemDictMapper systemDictMapper;

    @Override
    public Long add(SystemDict systemDict) {
        Long added = systemDictMapper.add(systemDict);
        Assert.isTrue(added != null && added > 0, "操作失败");
        return null;
    }

    @Override
    public Long update(SystemDict systemDict) {
        Long updated = systemDictMapper.update(systemDict);
        Assert.isTrue(updated != null && updated > 0, "操作失败");
        return null;
    }

    @Override
    public SystemDict getById(String id) {
        SystemDict systemDict = systemDictMapper.getById(id);
        return systemDict;
    }
}
