package com.commulinic.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

@Component
public class JwtProvider {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private long expiration;

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
//                .withClaim("role", role)
                .sign(algorithm);
    }

    public String extractPhone(String token) {
        DecodedJWT decoded = JWT.decode(token);
        return decoded.getIssuer();
    }


    public boolean validateToken(String token, UserDetails userDetails) {
        Algorithm algorithm = Algorithm.HMAC256(secret);

        JWTVerifier verifier = JWT.require(algorithm).build();
        try {
            DecodedJWT decoded = verifier.verify(token);
            return extractPhone(token).equals(userDetails.getUsername());
        } catch (Exception e) {
            return false;
        }
    }
}
