package com.commulinic.service.impl;

import com.commulinic.entity.Application;
import com.commulinic.entity.Department;
import com.commulinic.entity.Doctor;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.ApplicationMapper;
import com.commulinic.service.ApplicationService;
import com.commulinic.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    @Autowired
    private ApplicationMapper applicationMapper;
    @Autowired
    private DoctorService doctorService;

    @Override
    public PageVO<Application> page(PageQueryDTO<Application> dto) {
        List<Application> records = applicationMapper.page(dto);
        PageVO<Application> res = new PageVO<Application>();
        res.setRecords(records);
        if (dto.getCount()) {
            Long count = applicationMapper.count(dto.getData());
            res.setTotal(count);
        }
        return res;
    }

    @Override
    public Long add(Application application) {
        Long added = applicationMapper.add(application);
        return added;
    }

    @Override
    public Long update(Application application) {
        Long updated = applicationMapper.update(application);
        return updated;
    }

    @Override
    public Long count(Application application) {
        Long count = applicationMapper.count(application);
        return count;
    }

    @Override
    public Long updateDepartment(Department department) {
        return applicationMapper.updateDepartment(department);
    }

    @Override
    @Transactional
    public Long accept(Application application) {
        Doctor doctor = new Doctor();
        doctor.setUserId(application.getUserId());
        doctor.setDepartmentId(application.getDepartmentId());
        doctor.setDepartment(application.getDepartment());
        doctor.setStatus(Doctor.STATUS_ABSENT);
        doctor.setSeniority((int) (System.currentTimeMillis() / 1000));
        doctorService.add(doctor);
        application.setUpdatedAt(doctor.getSeniority());
        application.setStatus(Application.STATUS_PASS);
        applicationMapper.update(application);
        return 1L;
    }
}
