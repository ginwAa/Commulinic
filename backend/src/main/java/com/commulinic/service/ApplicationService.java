package com.commulinic.service;

import com.commulinic.entity.Application;
import com.commulinic.entity.Department;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;

public interface ApplicationService {
    PageVO<Application> page(PageQueryDTO<Application> application);

    Long add(Application application);

    Long update(Application application);

    Long count(Application application);

    Long updateDepartment(Department department);

    Long accept(Application application);

    Long updateUserName(Long userId, String userName);
}
