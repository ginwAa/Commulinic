package com.commulinic.service.impl;

import com.commulinic.entity.Register;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.RegisterMapper;
import com.commulinic.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Long add(Register register) {
        Long added = registerMapper.add(register);
        return added;
    }

    @Override
    public Long update(Register register) {
        Long updated = registerMapper.update(register);
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
        return updated;
    }

    @Override
    public Long updateDoctorName(Long doctorId, String doctorName) {
        Long updated = registerMapper.updateDoctorName(doctorId, doctorName);
        return updated;
    }
}
