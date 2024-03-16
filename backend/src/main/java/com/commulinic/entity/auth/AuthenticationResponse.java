package com.commulinic.entity.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse implements Serializable {
    private String token;
    private Long userId;
    private String userName;
    private Integer role;
}
