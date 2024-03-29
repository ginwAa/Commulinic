package com.commulinic.controller;

import com.commulinic.entity.Application;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.result.Result;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.service.ApplicationService;
import jakarta.annotation.Resource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/application")
public class ApplicationController {
    @Resource
    private ApplicationService applicationService;

    //    @PreAuthorize("hasAuthority('admin:read')")
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

    @PreAuthorize("hasAuthority('admin:update')")
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

    @PreAuthorize("hasAuthority('admin:update')")
    @PostMapping("/accept")
    public Result<Long> accept(@RequestBody Application application) {
        application.setStatus(Application.STATUS_PASS);
        Long accepted = applicationService.accept(application);
        return Result.success(accepted);
    }

    @PostMapping("/cancel")
    public Result<Long> cancel(@RequestBody Application application) {
        application.setStatus(Application.STATUS_CANCELED);
        Long canceled = applicationService.update(application);
        return Result.success(canceled);
    }

    @PostMapping("/read")
    public Result<Long> read() {
        Application application = new Application();
    }
}
