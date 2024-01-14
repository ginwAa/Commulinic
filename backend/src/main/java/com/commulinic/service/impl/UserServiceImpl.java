package com.commulinic.service.impl;

import com.commulinic.entity.User;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.UserMapper;
import com.commulinic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
