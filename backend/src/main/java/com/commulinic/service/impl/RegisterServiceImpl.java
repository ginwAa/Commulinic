package com.commulinic.service.impl;

import cn.hutool.core.lang.Assert;
import com.commulinic.entity.Register;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.RegisterMapper;
import com.commulinic.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RegisterServiceImpl implements RegisterService {
    @Autowired
    private RegisterMapper registerMapper;

    @Override
    public PageVO<Register> page(PageQueryDTO<Register> dto) {
        PageVO<Register> ret = new PageVO<>();
        List<Register> page = registerMapper.page(dto);
        ret.setRecords(page);
        if (dto.getCount()) {
            Long count = registerMapper.count(dto.getData());
            ret.setTotal(count);
        }
        return ret;
    }

    @Override
    @Transactional
    public Long add(Register register) {
        register.setCreateTime((System.currentTimeMillis() / 1000));
        Long added = registerMapper.add(register);
        Assert.isTrue(added != null && added > 0, "操作失败");
        return added;
    }

    @Override
    @Transactional
    public Long update(Register register) {
        Long updated = registerMapper.update(register);
        Assert.isTrue(updated != null && updated > 0, "操作失败");
        return updated;
    }

    @Override
    public Long count(Register register) {
        Long counted = registerMapper.count(register);
        return counted;
    }

    @Override
    public Long updateUserName(Long userId, String userName) {
        Long updated = registerMapper.updateUserName(userId, userName);
        Assert.isTrue(updated != null && updated > 0, "操作失败");
        return updated;
    }

    @Override
    public Long updateDoctorName(Long doctorId, String doctorName) {
        Long updated = registerMapper.updateDoctorName(doctorId, doctorName);
        Assert.isTrue(updated != null && updated > 0, "操作失败");
        return updated;
    }
}
