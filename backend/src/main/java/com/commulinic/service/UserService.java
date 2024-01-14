package com.commulinic.service;

import com.commulinic.entity.User;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;

public interface UserService {
    Long add(User user);

    Long update(User user);

    PageVO<User> pageByUser(PageQueryDTO<User> dto);

    User getById(Long id);

}
