package com.commulinic.filter;

import com.commulinic.exception.UserAlreadyExistsException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class UserAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/javascript;charset=utf-8");
        if (authException.getClass() == BadCredentialsException.class) {
            response.getWriter().print("手机号或密码错误！");
            return;
        }
        if (authException.getClass() == UserAlreadyExistsException.class) {
            response.getWriter().print("该手机号已被注册！");
            return;
        }
        if (authException.getClass() == DisabledException.class || authException.getClass() == LockedException.class) {
            response.getWriter().print("账号已被锁定，请联系管理员！");
            return;
        }
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}
