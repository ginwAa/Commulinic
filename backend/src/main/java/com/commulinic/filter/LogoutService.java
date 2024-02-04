package com.commulinic.filter;

import com.commulinic.constant.RedisConstant;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final ValueOperations<String, String> valueOperations;
    private final JwtProvider jwtProvider;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        final String jwt = authHeader.substring(7);
        if (jwtProvider.validateToken(jwt)) {
            final Date now = new Date();
            final Long expiration = jwtProvider.extractExpiration(jwt);
            final String key = RedisConstant.REDIS_BLACK_LIST_PREFIX + jwt;
            valueOperations.set(key, "", expiration - now.getTime(), TimeUnit.MICROSECONDS);
            SecurityContextHolder.clearContext();
        }
    }
}
