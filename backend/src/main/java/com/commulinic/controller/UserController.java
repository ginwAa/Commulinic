package com.commulinic.controller;

import com.commulinic.entity.PageResult;
import com.commulinic.entity.User;
import com.commulinic.entity.dto.UserPageQueryDTO;
import com.commulinic.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Long register(@RequestBody User user) {
        //TODO check duplicate
        log.info("register {}", user.toString());
        return userService.add(user);
    }

    @GetMapping("/page")
    public PageResult page(UserPageQueryDTO userPageQueryDTO) {
        log.info("page {}", userPageQueryDTO.toString());
        PageResult result = userService.pageByUser(userPageQueryDTO);
        return result;
    }

    @PostMapping("/update")
    public Long update(@RequestBody User user) {
        log.info("update {}", user.toString());
        return userService.update(user);
    }

    @PostMapping("/add")
    public Long add(@RequestBody User user) {
        log.info("add {}", user.toString());
        return userService.add(user);
    }
}
