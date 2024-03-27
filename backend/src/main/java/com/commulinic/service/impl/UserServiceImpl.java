package com.commulinic.service.impl;

import cn.hutool.core.lang.Assert;
import com.commulinic.entity.Doctor;
import com.commulinic.entity.User;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.*;
import com.commulinic.service.UserService;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;
    @Resource
    private RegisterMapper registerMapper;
    @Resource
    private DoctorMapper doctorMapper;
    @Resource
    private ApplicationMapper applicationMapper;
    @Resource
    private ChatMapper chatMapper;

    @Resource
    private PasswordEncoder passwordEncoder;

    @Override
    public Long add(User user) {
        return userMapper.add(user);
    }


    @Override
    @Transactional
    public Long update(User user) {
        if (ObjectUtils.isNotEmpty(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        Long updated = userMapper.update(user);
        Assert.isTrue(updated != null && updated > 0, "操作失败1");
        if (user.getName() != null && !user.getName().isEmpty()) {
            updated = registerMapper.updateUserName(user.getId(), user.getName());
//            Assert.isTrue(updated != null && updated > 0, "操作失败2");
            updated = applicationMapper.updateUserName(user.getId(), user.getName());
//            Assert.isTrue(updated != null && updated > 0, "操作失败3");
            Doctor doctor = doctorMapper.getByUserId(user.getId());
            if (doctor != null) {
                updated = registerMapper.updateDoctorName(doctor.getId(), user.getName());
//                Assert.isTrue(updated != null && updated > 0, "操作失败4");
            }
            updated = chatMapper.updateByUsername(user.getUsername(), user.getId());
//            Assert.isTrue(updated != null && updated > 0, "操作失败5");
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
