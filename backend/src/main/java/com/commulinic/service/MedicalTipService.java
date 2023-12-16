package com.commulinic.service;

import com.commulinic.entity.MedicalTip;
import com.commulinic.entity.PageResult;
import com.commulinic.entity.dto.MedicalTipPageQueryDTO;

public interface MedicalTipService {
    Long add(String tip);

    Long update(MedicalTip tip);

    PageResult page(MedicalTipPageQueryDTO dto);
}
