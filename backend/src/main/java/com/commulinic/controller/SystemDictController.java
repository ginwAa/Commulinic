package com.commulinic.controller;

import com.commulinic.entity.SystemDict;
import com.commulinic.entity.result.Result;
import com.commulinic.service.SystemDictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("systemDict")
public class SystemDictController {
    @Autowired
    private SystemDictService systemDictService;

    @GetMapping("/getById/{id}")
    public Result<SystemDict> getById(@PathVariable String id) {
        SystemDict systemDict = systemDictService.getById(id);
        return Result.success(systemDict);
    }

    @PostMapping("/add")
    public Result<Long> add(SystemDict systemDict) {
        Long added = systemDictService.add(systemDict);
        return Result.success(added);
    }

    @PostMapping("update")
    public Result<Long> update(SystemDict systemDict) {
        Long updated = systemDictService.update(systemDict);
        return Result.success(updated);
    }
}
