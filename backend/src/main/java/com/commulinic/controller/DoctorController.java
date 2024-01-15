package com.commulinic.controller;

import com.commulinic.entity.Doctor;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.result.Result;
import com.commulinic.entity.vo.DoctorVO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @PostMapping("/page")
    public Result<PageVO<DoctorVO>> page(@RequestBody PageQueryDTO<DoctorVO> dto) {
        PageVO<DoctorVO> page = doctorService.page(dto);
        return Result.success(page);
    }

    @PostMapping("/add")
    public Result<Long> add(@RequestBody Doctor doctor) {
        Long added = doctorService.add(doctor);
        return Result.success(added);
    }

    @PostMapping("/update")
    public Result<Long> update(@RequestBody Doctor doctor) {
        Long updated = doctorService.update(doctor);
        return Result.success(updated);
    }

    @GetMapping("/getById/{id}")
    public Result<DoctorVO> getById(@PathVariable Long id) {
        DoctorVO vo = doctorService.getById(id);
        return Result.success(vo);
    }

}
