package com.commulinic.service.impl;

import com.commulinic.entity.MedTip;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.MedTipMapper;
import com.commulinic.service.MedTipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedTipServiceImpl implements MedTipService {
    @Autowired
    MedTipMapper medTipMapper;

    @Override
    public Long add(MedTip tip) {
        tip.setUpdatedAt((int) (System.currentTimeMillis() / 1000));
        return medTipMapper.add(tip);
    }

    @Override
    public Long update(MedTip tip) {
        tip.setUpdatedAt((int) (System.currentTimeMillis() / 1000));
        return medTipMapper.update(tip);
    }

    @Override
    public PageVO<MedTip> page(PageQueryDTO<MedTip> dto) {
        PageVO<MedTip> ret = new PageVO<MedTip>();
        List<MedTip> res = medTipMapper.page(dto);
        ret.setRecords(res);
        return ret;
    }
}
