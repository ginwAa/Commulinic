package com.commulinic.entity;

import com.commulinic.entity.auth.Role;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.Objects;

@Data
@Slf4j
public class User implements Serializable, UserDetails {
    public final static Integer GENDER_MALE = 1;
    public final static Integer GENDER_FEMALE = 2;
    public final static Integer ROLE_ADMIN = 1;
    public final static Integer ROLE_DOCTOR = 2;
    public final static Integer ROLE_NORMAL = 4;
    public final static Integer STATUS_ACTIVE = 1;
    public final static Integer STATUS_FROZEN = 2;
    private Long id;
    private String name;
    private String password;
    private String address;
    private Integer gender; // 1 male 2 female
    private Integer status; // 1 normal 2 frozen
    private Integer role; // 1 admin 2 doctor 4 normal
    private String phone;
    private String email;
    private Integer age;
    private String emergency;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Role roleEnum = Role.NORMAL;
        if (Objects.equals(role, ROLE_ADMIN)) {
            roleEnum = Role.ADMIN;
        } else if (Objects.equals(role, ROLE_DOCTOR)) {
            roleEnum = Role.DOCTOR;
        }
        log.info("roleEnum: {}", roleEnum);
        return roleEnum.getAuthorities();
    }

    @Override
    public String getUsername() {
        return phone;
    }

    @Override
    public boolean isAccountNonExpired() {
        return Objects.equals(status, STATUS_ACTIVE);
    }

    @Override
    public boolean isAccountNonLocked() {
        return Objects.equals(status, STATUS_ACTIVE);
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return Objects.equals(status, STATUS_ACTIVE);
    }

    @Override
    public boolean isEnabled() {
        return Objects.equals(status, STATUS_ACTIVE);
    }
}
