package com.commulinic.controller;

import com.commulinic.entity.Result;
import com.commulinic.entity.User;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Result<Long> register(@RequestBody User user) {
        //TODO check duplicate
        log.info("register {}", user.toString());
        Long added = userService.add(user);
        return Result.success(added);
    }

    @PostMapping("/page")
    public Result<PageVO<User>> page(@RequestBody PageQueryDTO<User> dto) {
        log.info(dto.toString());
        PageVO<User> result = userService.pageByUser(dto);
        return Result.success(result);
    }


    @PostMapping("/update")
    public Result<Long> update(@RequestBody User user) {
        log.info("update {}", user.toString());
        Long updated = userService.update(user);
        return Result.success(updated);
    }

    @PostMapping("/add")
    public Result<Long> add(@RequestBody User user) {
        log.info("add {}", user.toString());
        Long added = userService.add(user);
        return Result.success(added);
    }
}
