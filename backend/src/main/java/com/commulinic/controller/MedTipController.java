package com.commulinic.controller;

import com.commulinic.entity.MedTip;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.result.Result;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.service.MedTipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/medTip")
public class MedTipController {
    @Autowired
    private MedTipService medTipService;

    @PostMapping("/page")
    private Result<PageVO<MedTip>> page(@RequestBody PageQueryDTO<MedTip> dto) {
        PageVO<MedTip> page = medTipService.page(dto);
        return Result.success(page);
    }

    @PostMapping("/add")
    private Result<Long> add(@RequestBody MedTip tip) {
        Long added = medTipService.add(tip);
        return Result.success(added);
    }

    @PostMapping("/update")
    private Result<Long> update(@RequestBody MedTip tip) {
        Long updated = medTipService.update(tip);
        return Result.success(updated);
    }

}
