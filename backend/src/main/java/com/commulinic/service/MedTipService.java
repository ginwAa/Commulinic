package com.commulinic.service;

import com.commulinic.entity.MedTip;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;

public interface MedTipService {
    Long add(MedTip tip);

    Long update(MedTip tip);

    PageVO<MedTip> page(PageQueryDTO<MedTip> dto);

    Long delete(MedTip tip);
}
