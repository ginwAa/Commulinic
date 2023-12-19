package com.commulinic.service.impl;

import com.commulinic.entity.PageResult;
import com.commulinic.entity.User;
import com.commulinic.entity.dto.UserPageQueryDTO;
import com.commulinic.mapper.UserMapper;
import com.commulinic.service.UserService;
import com.github.pagehelper.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public Long add(User user) {
        return userMapper.add(user);
    }

    @Override
    public Long update(User user) {
        return userMapper.update(user);
    }

    @Override
    public PageResult pageByUser(UserPageQueryDTO userPageQueryDTO) {
        userPageQueryDTO.setPage((userPageQueryDTO.getPage() - 1) * userPageQueryDTO.getPageSize());
        Page<User> res = userMapper.page(userPageQueryDTO);
        PageResult ret = new PageResult();
        Long total = userMapper.count(userPageQueryDTO);
        ret.setTotal(total);
        ret.setRecords(res.getResult());
        return ret;
    }
}
