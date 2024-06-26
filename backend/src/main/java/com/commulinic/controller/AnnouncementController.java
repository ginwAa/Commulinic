package com.commulinic.controller;

import com.commulinic.entity.Announcement;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.result.Result;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.service.AnnouncementService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/announcement")
@Slf4j
public class AnnouncementController {
    @Autowired
    private AnnouncementService announcementService;

    @PreAuthorize("hasAnyAuthority('admin:create')")
    @PostMapping("/add")
    public Result<Long> add(@RequestBody Announcement announcement) {
        Long added = announcementService.add(announcement);
        return Result.success(added);
    }

    @PreAuthorize("hasAnyAuthority('admin:update')")
    @PostMapping("/update")
    public Result<Long> update(@RequestBody Announcement announcement) {
        Long updated = announcementService.update(announcement);
        return Result.success(updated);
    }

    @PostMapping("/page")
    public Result<PageVO<Announcement>> page(@RequestBody PageQueryDTO<Announcement> dto) {
        PageVO<Announcement> vo = announcementService.page(dto);
        return Result.success(vo);
    }

    @PostMapping("/count")
    public Result<Long> count(@RequestBody Announcement announcement) {
        Long count = announcementService.count(announcement);
        return Result.success(count);
    }

    @PreAuthorize("hasAnyAuthority('admin:delete')")
    @PostMapping("/delete")
    public Result<Long> delete(@RequestBody Announcement announcement) {
        Long deleted = announcementService.delete(announcement);
        return Result.success(deleted);
    }
}
