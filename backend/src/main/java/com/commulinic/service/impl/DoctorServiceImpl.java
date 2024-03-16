package com.commulinic.service.impl;

import cn.hutool.core.lang.Assert;
import com.commulinic.entity.Department;
import com.commulinic.entity.Doctor;
import com.commulinic.entity.User;
import com.commulinic.entity.dto.DoctorRegisterDTO;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.DoctorVO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.DoctorMapper;
import com.commulinic.mapper.UserMapper;
import com.commulinic.service.DoctorService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.commulinic.entity.Department.ROOT_DEPT_ID;
import static com.commulinic.entity.Doctor.DOCTOR_STATUS_ACTIVE;
import static com.commulinic.entity.Register.SECTION_MORNING;
import static com.commulinic.entity.User.ROLE_DOCTOR;

@Service
public class DoctorServiceImpl implements DoctorService {
    @Autowired
    private DoctorMapper doctorMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public DoctorVO getByUserId(Long id) {
        Doctor doctor = doctorMapper.getByUserId(id);
        User user = userMapper.getById(doctor.getUserId());
        DoctorVO vo = new DoctorVO();
        BeanUtils.copyProperties(doctor, vo);
        BeanUtils.copyProperties(user, vo);
        return vo;
    }

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
        User user = userMapper.getById(doctor.getUserId());
        DoctorVO vo = new DoctorVO();
        BeanUtils.copyProperties(doctor, vo);
        BeanUtils.copyProperties(user, vo);
        return vo;
    }

    @Override
    public Long updateDepartment(Department department) {
        Long updated = doctorMapper.updateDepartment(department);
        Assert.isTrue(updated != null && updated > 0, "操作失败");
        return updated;
    }

    public Long update(Doctor doctor) {
        Long updated = doctorMapper.update(doctor);
        Assert.isTrue(updated != null && updated > 0, "操作失败");
        return updated;
    }

    public Long add(Doctor doctor) {
        Long added = doctorMapper.add(doctor);
        Assert.isTrue(added != null && added > 0, "操作失败");
        return added;
    }

    @Override
    public PageVO<DoctorVO> pageRegister(PageQueryDTO<DoctorRegisterDTO> dto) {
        if (dto.getData().getDepartmentId().equals(ROOT_DEPT_ID)) {
            dto.getData().setDepartmentId(null);
        }
        dto.getData().setStatus(DOCTOR_STATUS_ACTIVE);
        dto.getData().setRole(ROLE_DOCTOR);
        dto.getData().setEndDate(dto.getData().getBeginDate() + 86400);
        List<DoctorVO> page = doctorMapper.pageWithStock(dto);
        PageVO<DoctorVO> result = new PageVO<DoctorVO>();
        result.setRecords(page);
        if (dto.getCount()) {
            result.setTotal(doctorMapper.countWithStock(dto.getData()));
        }
        List<DoctorVO> vos = result.getRecords().stream()
                .peek(v -> v.setStock(
                        (v.getStock().equals(SECTION_MORNING) ? v.getAmStd() : v.getPmStd()) - v.getStock())
                ).collect(Collectors.toList());
        result.setRecords(vos);
        return result;
    }
}
