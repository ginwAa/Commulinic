package com.commulinic.service.impl;

import com.commulinic.entity.MedicalTip;
import com.commulinic.entity.PageResult;
import com.commulinic.entity.dto.MedicalTipPageQueryDTO;
import com.commulinic.mapper.MedicalTipMapper;
import com.commulinic.service.MedicalTipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalTipServiceImpl implements MedicalTipService {
    @Autowired
    MedicalTipMapper medicalTipMapper;

    @Override
    public Long add(String tip) {
        return medicalTipMapper.add(tip);
    }

    @Override
    public Long update(MedicalTip tip) {
        return medicalTipMapper.update(tip);
    }

    @Override
    public PageResult page(MedicalTipPageQueryDTO dto) {
        PageResult ret = new PageResult();
        List<MedicalTip> res = medicalTipMapper.page(dto);
        ret.setRecords(res);
        return ret;
    }
}
