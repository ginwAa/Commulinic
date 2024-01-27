package com.commulinic.service;

import com.commulinic.entity.Department;
import com.commulinic.entity.Doctor;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.DoctorVO;
import com.commulinic.entity.vo.PageVO;

public interface DoctorService {

    PageVO<DoctorVO> page(PageQueryDTO<DoctorVO> dto);

    Long add(Doctor doctor);

    Long update(Doctor doctor);

    DoctorVO getById(Long id);

    DoctorVO getByUserId(Long id);

    Long updateDepartment(Department department);
}
