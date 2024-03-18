package com.commulinic.util;

import com.commulinic.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Slf4j
public class SecurityUtil {
    public static User getUser() {
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            return null;
        }
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public static Long getUserId() {
        Long id = Optional.ofNullable(getUser()).map(User::getId).orElse(null);
        if (ObjectUtils.isEmpty(id)) {
            log.info("用户未登录，获取USER_ID为NULL");
        }
        return id;
    }

    public static String getUserName() {
        String name = Optional.ofNullable(getUser()).map(User::getName).orElse(null);
        if (ObjectUtils.isEmpty(name)) {
            log.info("用户未登录，获取USER_NAME为NULL");
        }
        return name;
    }

    public static Integer getRole() {
        Integer role = Optional.ofNullable(getUser()).map(User::getRole).orElse(null);
        if (ObjectUtils.isEmpty(role)) {
            log.info("用户未登录，获取USER_ROLE为NULL");
        }
        return role;
    }

    public static boolean isLogin() {
        return SecurityContextHolder.getContext().getAuthentication() != null;
    }
}
