package com.commulinic.entity.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_DELETE("admin:delete"),
    ADMIN_CREATE("admin:create"),
    DOCTOR_READ("doctor:read"),
    DOCTOR_UPDATE("doctor:update"),
    DOCTOR_DELETE("doctor:delete"),
    DOCTOR_CREATE("doctor:create"),

    TOURIST_READ("tourist:read"),
    TOURIST_UPDATE("tourist:update"),
    TOURIST_DELETE("tourist:delete"),
    TOURIST_CREATE("tourist:create"),

    NORMAL_READ("normal:read"),
    NORMAL_UPDATE("normal:update"),
    NORMAL_DELETE("normal:delete"),
    NORMAL_CREATE("normal:create"),
    ;

    @Getter
    private final String permission;
}
