package com.commulinic.service.impl;

import cn.hutool.core.lang.Assert;
import com.commulinic.entity.Application;
import com.commulinic.entity.Department;
import com.commulinic.entity.Doctor;
import com.commulinic.entity.User;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.ApplicationMapper;
import com.commulinic.mapper.DoctorMapper;
import com.commulinic.mapper.UserMapper;
import com.commulinic.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.commulinic.entity.Doctor.DOCTOR_STATUS_ABSENT;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    @Autowired
    private ApplicationMapper applicationMapper;

    @Autowired
    private DoctorMapper doctorMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public Long updateUserName(Long userId, String userName) {
        Long updated = applicationMapper.updateUserName(userId, userName);
        Assert.isTrue(updated > 0, "操作失败");
        return updated;
    }

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
//        Assert.isTrue(added != null && added > 0, "操作失败");
        return added;
    }

    @Override
    public Long update(Application application) {
        Long updated = applicationMapper.update(application);
        Assert.isTrue(updated != null && updated > 0, "操作失败");
        return updated;
    }

    @Override
    public Long count(Application application) {
        Long count = applicationMapper.count(application);
        return count;
    }

    @Override
    public Long updateDepartment(Department department) {
        Long updated = applicationMapper.updateDepartment(department);
        Assert.isTrue(updated != null && updated > 0, "操作失败");
        return updated;
    }

    @Override
    @Transactional
    public Long accept(Application application) {
        Doctor doctor = new Doctor();
        doctor.setUserId(application.getUserId());
        doctor.setDepartmentId(application.getDepartmentId());
        doctor.setDepartment(application.getDepartment());
        doctor.setStatus(DOCTOR_STATUS_ABSENT);
        doctor.setSeniority((int) (System.currentTimeMillis() / 1000));
        doctor.setAmStd(0);
        doctor.setPmStd(0);
        Long added = doctorMapper.add(doctor);
        Assert.isTrue(added > 0, "操作失败1");
        User user = new User();
        user.setId(application.getUserId());
        user.setRole(User.ROLE_DOCTOR);
        Long updated = userMapper.update(user);
        Assert.isTrue(updated != null && updated > 0, "操作失败2");
        application.setUpdatedAt(doctor.getSeniority());
        application.setStatus(Application.STATUS_PASS);
        updated = applicationMapper.update(application);
        Assert.isTrue(updated != null && updated > 0, "操作失败3");
        return 1L;
    }

    @Override
    @Transactional
    public Long read() {
        Long read = applicationMapper.read();
        return read;
    }
}
