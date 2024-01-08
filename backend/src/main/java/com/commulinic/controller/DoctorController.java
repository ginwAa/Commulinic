package com.commulinic.controller;

import com.commulinic.entity.Doctor;
import com.commulinic.entity.PageResult;
import com.commulinic.entity.dto.DoctorPageQueryDTO;
import com.commulinic.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @GetMapping("/page")
    public PageResult page(DoctorPageQueryDTO dto) {
        return doctorService.page(dto);
    }

    @PostMapping("/add")
    public Long add(Doctor doctor) {
        return doctorService.add(doctor);
    }

    @PostMapping("/update")
    public Long update(Doctor doctor) {
        return doctorService.update(doctor);
    }
}
