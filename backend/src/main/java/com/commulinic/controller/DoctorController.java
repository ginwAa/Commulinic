package com.commulinic.controller;

import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.ObjectUtil;
import com.commulinic.entity.Doctor;
import com.commulinic.entity.dto.DoctorRegisterDTO;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.result.Result;
import com.commulinic.entity.vo.DoctorVO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.service.DoctorService;
import com.commulinic.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @PreAuthorize("hasAuthority('admin:read')")
    @PostMapping("/page")
    public Result<PageVO<DoctorVO>> page(@RequestBody PageQueryDTO<DoctorVO> dto) {
        PageVO<DoctorVO> page = doctorService.page(dto);
        return Result.success(page);
    }

    @PostMapping("/page/register")
//    @PreAuthorize("hasAuthority('normal:read')")
    public Result<PageVO<DoctorVO>> pageRegister(@RequestBody PageQueryDTO<DoctorRegisterDTO> dto) {
        PageVO<DoctorVO> page = doctorService.pageRegister(dto);
        return Result.success(page);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('admin:create')")
    public Result<Long> add(@RequestBody Doctor doctor) {
        Long added = doctorService.add(doctor);
        return Result.success(added);
    }

    @PostMapping("/update")
    @PreAuthorize("hasAuthority('doctor:update')")
    public Result<Long> update(@RequestBody Doctor doctor) {
        Long updated = doctorService.update(doctor);
        return Result.success(updated);
    }

    @GetMapping("/getById/{id}")
    public Result<DoctorVO> getById(@PathVariable Long id) {
        DoctorVO vo = doctorService.getById(id);
        return Result.success(vo);
    }

    @GetMapping("/entity/me")
    @PreAuthorize("hasAuthority('doctor:read')")
    public Result<DoctorVO> me() {
        Assert.isTrue(ObjectUtil.isNotEmpty(SecurityUtil.getUserId()), "用户未登录");
        DoctorVO doctor = doctorService.getByUserId(SecurityUtil.getUserId());
        return Result.success(doctor);
    }
}
