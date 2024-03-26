package com.commulinic.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.commulinic.constant.RedisConstant;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtProvider {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private long expiration;
    private final ValueOperations<String, String> valueOperations;
    private final RedisTemplate<String, Object> redisTemplate;

    @PostConstruct
    public void init() {
        secret = Base64.getEncoder().encodeToString(secret.getBytes());
    }

    public String createToken(UserDetails userDetails) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        Date start = new Date();
        Date end = new Date(start.getTime() + expiration);
        return JWT.create()
                .withIssuer(userDetails.getUsername())
                .withIssuedAt(start)
                .withExpiresAt(end)
                .sign(algorithm);
    }

    public String extractPhone(String token) {
        DecodedJWT decoded = JWT.decode(token);
        return decoded.getIssuer();
    }


    public boolean validateTokenWithUser(String token, UserDetails userDetails) throws JWTVerificationException {
        Algorithm algorithm = Algorithm.HMAC256(secret);

        JWTVerifier verifier = JWT.require(algorithm).build();
        try {
            DecodedJWT decoded = verifier.verify(token);
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return extractPhone(token).equals(userDetails.getUsername());
    }

    public boolean validateToken(String token) throws JWTVerificationException {
        Algorithm algorithm = Algorithm.HMAC256(secret);

        JWTVerifier verifier = JWT.require(algorithm).build();
        try {
            verifier.verify(token);
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return true;
    }

    public Boolean notInBlackList(String token) {
        final String key = RedisConstant.REDIS_BLACK_LIST_PREFIX + token;
        return Boolean.FALSE.equals(redisTemplate.hasKey(key));
    }

    public void addToBlackList(String token, long expiration) {
        final String key = RedisConstant.REDIS_BLACK_LIST_PREFIX + token;
        valueOperations.set(token, "", expiration, TimeUnit.MICROSECONDS);
    }

    public Long extractExpiration(String token) {
        DecodedJWT decoded = JWT.decode(token);
        return decoded.getExpiresAt().getTime();
    }
}
