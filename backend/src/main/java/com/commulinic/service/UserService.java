package com.commulinic.service;

import com.commulinic.entity.PageResult;
import com.commulinic.entity.User;
import com.commulinic.entity.dto.UserPageQueryDTO;

public interface UserService {
    Long add(User user);

    Long update(User user);

    PageResult pageByUser(UserPageQueryDTO userPageQueryDTO);

}
