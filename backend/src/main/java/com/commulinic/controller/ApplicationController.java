package com.commulinic.controller;

import com.commulinic.entity.Application;
import com.commulinic.entity.Result;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/application")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/page")
    public Result<PageVO<Application>> page(@RequestBody PageQueryDTO<Application> application) {
        PageVO<Application> page = applicationService.page(application);
        return Result.success(page);
    }

    @PostMapping("/add")
    public Result<Long> add(@RequestBody Application application) {
        Long added = applicationService.add(application);
        return Result.success(added);
    }

    @PostMapping("/update")
    public Result<Long> update(@RequestBody Application application) {
        Long updated = applicationService.update(application);
        return Result.success(updated);
    }

    @PostMapping("/count")
    public Result<Long> count(@RequestBody Application application) {
        Long count = applicationService.count(application);
        return Result.success(count);
    }
}
