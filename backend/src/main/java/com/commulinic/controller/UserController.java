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
    public Integer register(@RequestBody User user) {
        log.info("register {}", user.toString());
        return 1;
    }

    @GetMapping("/page")
    public PageResult page(UserPageQueryDTO userPageQueryDTO) {
        log.info("page {}", userPageQueryDTO.toString());
        PageResult result = userService.pageByUser(userPageQueryDTO);
        return result;
    }
}
