package com.commulinic.service.impl;

import com.commulinic.entity.User;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.DoctorVO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.UserMapper;
import com.commulinic.service.ApplicationService;
import com.commulinic.service.DoctorService;
import com.commulinic.service.RegisterService;
import com.commulinic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RegisterService registerService;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private ApplicationService applicationService;

    @Override
    public Long add(User user) {
        return userMapper.add(user);
    }

    @Override
    @Transactional
    public Long update(User user) {
        Long updated = userMapper.update(user);
        if (user.getName() != null && !user.getName().isEmpty()) {
            registerService.updateUserName(user.getId(), user.getName());
            applicationService.updateUserName(user.getId(), user.getName());
            DoctorVO doctor = doctorService.getByUserId(user.getId());
            if (doctor != null) {
                registerService.updateDoctorName(doctor.getId(), user.getName());
            }
        }
        return updated;
    }

    @Override
    public User getById(Long id) {
        return userMapper.getById(id);
    }

    @Override
    public PageVO<User> pageByUser(PageQueryDTO<User> dto) {
        List<User> res = userMapper.page(dto);
        PageVO<User> ret = new PageVO<User>();
        ret.setRecords(res);
        if (dto.getCount()) {
            Long total = userMapper.count(dto.getData());
            ret.setTotal(total);
        }
        return ret;
    }
}
