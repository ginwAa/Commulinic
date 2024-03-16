package com.commulinic.service.impl;

import cn.hutool.core.lang.Assert;
import com.commulinic.entity.User;
import com.commulinic.entity.auth.AuthenticationResponse;
import com.commulinic.exception.UserAlreadyExistsException;
import com.commulinic.filter.JwtProvider;
import com.commulinic.mapper.UserMapper;
import com.commulinic.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authManager;
    private final UserMapper userMapper;

    @Override
    public AuthenticationResponse login(User user) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getPhone(),
                        user.getPassword()
                )
        );
        User verifiedUser = userMapper.getByPhone(user.getPhone());
        String token = jwtProvider.createToken(verifiedUser);
        return new AuthenticationResponse(token, verifiedUser.getId(), verifiedUser.getUsername(), verifiedUser.getRole());
    }

    @Override
    public AuthenticationResponse register(User user) {
        User duplicate = userMapper.getByPhone(user.getPhone());
        if (duplicate != null) {
            throw new UserAlreadyExistsException("手机号或密码错误");
        }
        user.setRole(User.ROLE_NORMAL);
        user.setStatus(User.STATUS_ACTIVE);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Long added = userMapper.add(user);
        Assert.isTrue(added != null && added > 0, "操作失败");
//        String token = jwtProvider.createToken(user);
        return new AuthenticationResponse(null, null, null, null);
    }
}
