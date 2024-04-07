package com.commulinic.controller;

import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.ObjectUtil;
import com.commulinic.entity.User;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.result.Result;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.service.UserService;
import com.commulinic.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PreAuthorize("hasAuthority('admin:read')")
    @PostMapping("/page")
    public Result<PageVO<User>> page(@RequestBody PageQueryDTO<User> dto) {
        PageVO<User> result = userService.pageByUser(dto);
        return Result.success(result);
    }

    @PreAuthorize("hasAuthority('admin:update')")
    @PostMapping("/update")
    public Result<Long> update(@RequestBody User user) {
        Long updated = userService.update(user);
        return Result.success(updated);
    }

    @PreAuthorize("hasAuthority('admin:create')")
    @PostMapping("/add")
    public Result<Long> add(@RequestBody User user) {
        Long added = userService.add(user);
        return Result.success(added);
    }

    @PreAuthorize("hasAuthority('normal:delete')")
    @GetMapping("/{id}")
    public Result<User> getById(@PathVariable Long id) {
        User user = userService.getById(id);
        user.setPassword(null);
        return Result.success(user);
    }

    @PostMapping("/me")
    @PreAuthorize("hasAuthority('normal:delete')")
    public Result<User> me() {
        Assert.isTrue(ObjectUtil.isNotEmpty(SecurityUtil.getUserId()), "获取登录信息失败");
        User user = userService.getById(SecurityUtil.getUserId());
        user.setPassword(null);
        return Result.success(user);
    }
}
