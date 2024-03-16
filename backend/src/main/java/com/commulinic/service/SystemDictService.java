package com.commulinic.service;

import com.commulinic.entity.SystemDict;

public interface SystemDictService {
    Long add(SystemDict systemDict);

    Long update(SystemDict systemDict);

    SystemDict getById(String id);
}
