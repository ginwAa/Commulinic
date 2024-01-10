package com.commulinic.controller;

import com.commulinic.entity.Doctor;
import com.commulinic.entity.PageResult;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.DoctorVO;
import com.commulinic.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @PostMapping("/page")
    public PageResult page(@RequestBody PageQueryDTO<DoctorVO> dto) {
        return doctorService.page(dto);
    }

    @PostMapping("/add")
    public Long add(@RequestBody Doctor doctor) {
        return doctorService.add(doctor);
    }

    @PostMapping("/update")
    public Long update(@RequestBody Doctor doctor) {
        return doctorService.update(doctor);
    }

    @GetMapping("/getById/{id}")
    public DoctorVO getById(@PathVariable Long id) {
        return doctorService.getById(id);
    }

}
