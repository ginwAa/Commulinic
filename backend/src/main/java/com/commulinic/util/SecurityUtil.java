package com.commulinic.util;

import com.commulinic.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
    public static User getUser() {
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            return null;
        }
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public static boolean isLogin() {
        return SecurityContextHolder.getContext().getAuthentication() != null;
    }
}
