package com.commulinic.service.impl;

import com.commulinic.entity.Doctor;
import com.commulinic.entity.User;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.ApplicationMapper;
import com.commulinic.mapper.DoctorMapper;
import com.commulinic.mapper.RegisterMapper;
import com.commulinic.mapper.UserMapper;
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
    private RegisterMapper registerMapper;
    @Autowired
    private DoctorMapper doctorMapper;
    @Autowired
    private ApplicationMapper applicationMapper;

    @Override
    public Long add(User user) {
        return userMapper.add(user);
    }

    @Override
    @Transactional
    public Long update(User user) {
        Long updated = userMapper.update(user);
        if (user.getName() != null && !user.getName().isEmpty()) {
            registerMapper.updateUserName(user.getId(), user.getName());
            applicationMapper.updateUserName(user.getId(), user.getName());
            Doctor doctor = doctorMapper.getByUserId(user.getId());
            if (doctor != null) {
                registerMapper.updateDoctorName(doctor.getId(), user.getName());
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
