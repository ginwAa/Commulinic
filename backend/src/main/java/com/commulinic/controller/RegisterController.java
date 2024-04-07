package com.commulinic.controller;

import com.commulinic.entity.Register;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.result.Result;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
public class RegisterController {
    @Autowired
    public RegisterService registerService;

    @PostMapping("/page")
    @PreAuthorize("hasAuthority('normal:read')")
    public Result<PageVO<Register>> page(@RequestBody PageQueryDTO<Register> dto) {
        PageVO<Register> page = registerService.page(dto);
        return Result.success(page);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('normal:create')")
    public Result<Long> add(@RequestBody Register register) {
        Long added = registerService.add(register);
        return Result.success(added);
    }

    @PostMapping("/update")
    @PreAuthorize("hasAuthority('normal:update')")
    public Result<Long> update(@RequestBody Register register) {
        Long updated = registerService.update(register);
        return Result.success(updated);
    }
}
