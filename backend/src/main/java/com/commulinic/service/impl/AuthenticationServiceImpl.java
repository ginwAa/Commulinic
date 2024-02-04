package com.commulinic.service.impl;

import com.commulinic.entity.AuthenticationResponse;
import com.commulinic.entity.User;
import com.commulinic.filter.JwtProvider;
import com.commulinic.mapper.UserMapper;
import com.commulinic.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
        if (verifiedUser == null) {
            throw new UsernameNotFoundException("手机号或密码错误");
        }
        String token = jwtProvider.createToken(verifiedUser);
        return new AuthenticationResponse(token);
    }

    @Override
    public AuthenticationResponse register(User user) {
        User duplicate = userMapper.getByPhone(user.getPhone());
        if (duplicate != null) {
            throw new UsernameNotFoundException("手机号或密码错误");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String token = jwtProvider.createToken(user);
        return new AuthenticationResponse(token);
    }
}
