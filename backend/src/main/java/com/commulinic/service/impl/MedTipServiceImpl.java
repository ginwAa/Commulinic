package com.commulinic.service.impl;

import cn.hutool.core.lang.Assert;
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
        Long added = medTipMapper.add(tip);
        Assert.isTrue(added != null && added > 0, "操作失败");
        return added;
    }

    @Override
    public Long update(MedTip tip) {
        tip.setUpdatedAt((int) (System.currentTimeMillis() / 1000));
        Long updated = medTipMapper.update(tip);
        Assert.isTrue(updated != null && updated > 0, "操作失败");
        return updated;
    }

    @Override
    public PageVO<MedTip> page(PageQueryDTO<MedTip> dto) {
        PageVO<MedTip> ret = new PageVO<MedTip>();
        List<MedTip> res = medTipMapper.page(dto);
        ret.setRecords(res);
        if (dto.getCount()) {
            Long count = medTipMapper.count(dto.getData());
            ret.setTotal(count);
        }
        return ret;
    }

    @Override
    public Long delete(MedTip tip) {
        Long deleted = medTipMapper.delete(tip);
        Assert.isTrue(deleted != null && deleted > 0, "操作失败");
        return deleted;
    }
}
