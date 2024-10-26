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
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

import static com.commulinic.entity.Department.ROOT_DEPT_ID;
import static com.commulinic.entity.Doctor.DOCTOR_STATUS_ACTIVE;
import static com.commulinic.entity.User.ROLE_DOCTOR;

@Service
@Slf4j
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
        BeanUtils.copyProperties(user, vo);
        BeanUtils.copyProperties(doctor, vo);
        return vo;
    }

    public PageVO<DoctorVO> page(PageQueryDTO<DoctorVO> dto) {
        if (dto.getData().getDepartmentId().equals(ROOT_DEPT_ID)) {
            dto.getData().setDepartmentId(null);
        }
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
        return added;
    }

    @Override
    public PageVO<DoctorVO> pageRegister(PageQueryDTO<DoctorRegisterDTO> dto) {
        if (dto.getData().getDepartmentId().equals(ROOT_DEPT_ID)) {
            dto.getData().setDepartmentId(null);
        }
        dto.getData().setStatus(DOCTOR_STATUS_ACTIVE);
        dto.getData().setRole(ROLE_DOCTOR);
        dto.getData().setBeginDate((int) LocalDateTime.ofEpochSecond(dto.getData().getBeginDate(), 0, ZoneOffset.UTC).toLocalDate().atStartOfDay().toEpochSecond(ZoneOffset.UTC));
        dto.getData().setEndDate(dto.getData().getBeginDate() + 86400);
        List<DoctorVO> page = doctorMapper.pageWithStock(dto, dto.getData().getSection());
        PageVO<DoctorVO> result = new PageVO<DoctorVO>();
        result.setRecords(page);
        if (dto.getCount()) {
            result.setTotal(doctorMapper.countWithStock(dto.getData(), dto.getData().getSection()));
        }
        List<DoctorVO> vos = new ArrayList<>(result.getRecords());
        result.setRecords(vos);
        return result;
    }
}
