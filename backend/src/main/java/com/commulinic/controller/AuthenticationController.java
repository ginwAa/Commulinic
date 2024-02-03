package com.commulinic.controller;

import com.commulinic.entity.AuthenticationResponse;
import com.commulinic.entity.User;
import com.commulinic.entity.result.Result;
import com.commulinic.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public Result<AuthenticationResponse> register(@RequestBody User user) {
        AuthenticationResponse response = authenticationService.register(user);
        return Result.success(response);
    }

    @PostMapping("/login")
    public Result<AuthenticationResponse> login(@RequestBody User user) {
        AuthenticationResponse response = authenticationService.login(user);
        return Result.success(response);
    }
}
