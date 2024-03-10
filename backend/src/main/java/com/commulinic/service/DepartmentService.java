package com.commulinic.service;

import com.commulinic.entity.Department;
import com.commulinic.entity.vo.DepartmentVO;

public interface DepartmentService {
    DepartmentVO tree(Integer type);

    Long add(Department department);

    Long update(Department department);

    Long delete(Long id);

    Department getById(Long id);
}
