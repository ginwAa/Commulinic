package com.commulinic.service.impl;

import com.commulinic.entity.Doctor;
import com.commulinic.entity.User;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.DoctorVO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.DoctorMapper;
import com.commulinic.service.DepartmentService;
import com.commulinic.service.DoctorService;
import com.commulinic.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {
    @Autowired
    private DoctorMapper doctorMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private DepartmentService departmentService;

    public PageVO<DoctorVO> page(PageQueryDTO<DoctorVO> dto) {
        List<DoctorVO> page = doctorMapper.page(dto);
        PageVO<DoctorVO> result = new PageVO<DoctorVO>();
        result.setRecords(page);
        if (dto.getCount()) {
            result.setTotal(doctorMapper.count(dto.getData()));
        }
        return result;
    }

    public DoctorVO getById(Long id) {
        Doctor doctor = doctorMapper.getById(id);
        User user = userService.getById(doctor.getUserId());
        DoctorVO vo = new DoctorVO();
        BeanUtils.copyProperties(doctor, vo);
        BeanUtils.copyProperties(user, vo);
        vo.setDepartment(departmentService.getById(doctor.getDepartmentId()).getName());
        return vo;
    }

    public Long update(Doctor doctor) {
        return doctorMapper.update(doctor);
    }

    public Long add(Doctor doctor) {
        return doctorMapper.add(doctor);
    }
}
