package com.commulinic.service;

import com.commulinic.entity.Doctor;
import com.commulinic.entity.PageResult;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.DoctorVO;

public interface DoctorService {

    PageResult page(PageQueryDTO<DoctorVO> dto);

    Long add(Doctor doctor);

    Long update(Doctor doctor);

    DoctorVO getById(Long id);
}
