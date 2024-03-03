package com.commulinic.controller;

import com.commulinic.entity.User;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.result.Result;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
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

}
