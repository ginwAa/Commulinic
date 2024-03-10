package com.commulinic.entity.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
public enum Role {
    NORMAL(
            Set.of(
                    Permission.TOURIST_READ,
                    Permission.TOURIST_UPDATE,
                    Permission.TOURIST_CREATE,
                    Permission.TOURIST_DELETE,
                    Permission.NORMAL_READ,
                    Permission.NORMAL_UPDATE,
                    Permission.NORMAL_DELETE,
                    Permission.NORMAL_CREATE
            )
    ),
    ADMIN(
            Set.of(
                    Permission.ADMIN_READ,
                    Permission.ADMIN_UPDATE,
                    Permission.ADMIN_DELETE,
                    Permission.ADMIN_CREATE,
                    Permission.DOCTOR_READ,
                    Permission.DOCTOR_UPDATE,
                    Permission.DOCTOR_CREATE,
                    Permission.DOCTOR_DELETE,
                    Permission.TOURIST_READ,
                    Permission.TOURIST_UPDATE,
                    Permission.TOURIST_CREATE,
                    Permission.TOURIST_DELETE,
                    Permission.NORMAL_READ,
                    Permission.NORMAL_UPDATE,
                    Permission.NORMAL_DELETE,
                    Permission.NORMAL_CREATE
            )
    ),
    DOCTOR(
            Set.of(
                    Permission.DOCTOR_READ,
                    Permission.DOCTOR_UPDATE,
                    Permission.DOCTOR_CREATE,
                    Permission.DOCTOR_DELETE,
                    Permission.TOURIST_READ,
                    Permission.TOURIST_UPDATE,
                    Permission.TOURIST_CREATE,
                    Permission.TOURIST_DELETE,
                    Permission.NORMAL_READ,
                    Permission.NORMAL_UPDATE,
                    Permission.NORMAL_DELETE,
                    Permission.NORMAL_CREATE
            )
    ),

    TOURIST(
            Set.of(
                    Permission.TOURIST_READ,
                    Permission.TOURIST_UPDATE,
                    Permission.TOURIST_CREATE,
                    Permission.TOURIST_DELETE
            )
    )
    ;

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>(permissions.stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
