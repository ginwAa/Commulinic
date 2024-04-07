package com.commulinic.controller;

import com.commulinic.entity.MedTip;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.result.Result;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.service.TipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/medTip")
public class MedTipController {
    @Autowired
    public TipService tipService;

    @PostMapping("/page")
    public Result<PageVO<MedTip>> page(@RequestBody PageQueryDTO<MedTip> dto) {
        PageVO<MedTip> page = tipService.page(dto);
        return Result.success(page);
    }


    @PreAuthorize("hasAuthority('admin:create')")
    @PostMapping("/add")
    public Result<Long> add(@RequestBody MedTip tip) {
        Long added = tipService.add(tip);
        return Result.success(added);
    }

    @PreAuthorize("hasAuthority('admin:update')")
    @PostMapping("/update")
    public Result<Long> update(@RequestBody MedTip tip) {
        Long updated = tipService.update(tip);
        return Result.success(updated);
    }

    @PreAuthorize("hasAuthority('admin:delete')")
    @PostMapping("/delete")
    public Result<Long> delete(@RequestBody MedTip tip) {
        Long deleted = tipService.delete(tip);
        return Result.success(deleted);
    }

}
