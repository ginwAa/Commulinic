package com.commulinic.service;

import com.commulinic.entity.Doctor;
import com.commulinic.entity.PageResult;
import com.commulinic.entity.dto.DoctorPageQueryDTO;

public interface DoctorService {

    PageResult page(DoctorPageQueryDTO dto);

    Long add(Doctor doctor);

    Long update(Doctor doctor);
}
