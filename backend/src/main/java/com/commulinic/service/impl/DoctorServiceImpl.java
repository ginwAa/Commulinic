package com.commulinic.service.impl;

import com.commulinic.entity.Doctor;
import com.commulinic.entity.PageResult;
import com.commulinic.entity.dto.DoctorPageQueryDTO;
import com.commulinic.mapper.DoctorMapper;
import com.commulinic.service.DoctorService;
import com.github.pagehelper.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorServiceImpl implements DoctorService {
    @Autowired
    private DoctorMapper doctorMapper;

    public PageResult page(DoctorPageQueryDTO dto) {
        dto.setPageSize(dto.getPageSize() * (dto.getPage() - 1));
        Page<Doctor> page = doctorMapper.page(dto);
        PageResult result = new PageResult();
        result.setRecords(page.getResult());
        result.setTotal(doctorMapper.count(dto));
        return result;
    }

    public Long update(Doctor doctor) {
        return doctorMapper.update(doctor);
    }

    public Long add(Doctor doctor) {
        return doctorMapper.add(doctor);
    }
}
