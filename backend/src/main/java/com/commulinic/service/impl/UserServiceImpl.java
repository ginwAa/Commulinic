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
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserMapper userMapper;
    private final RegisterMapper registerMapper;
    private final DoctorMapper doctorMapper;
    private final ApplicationMapper applicationMapper;

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

    @Override
    public UserDetails getByLogin(String phone, String password) {
        User user = userMapper.getByLogin(phone, password);
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        User user = userMapper.getByPhone(phone);
        if (user == null) {
            throw new UsernameNotFoundException("用户不存在");
        }
        return user;
    }
}
