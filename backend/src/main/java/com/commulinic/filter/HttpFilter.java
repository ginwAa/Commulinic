package com.commulinic.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;

@Component
@WebFilter(urlPatterns = "/*")
@Slf4j
public class HttpFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        MyRequestWrapper requestWrapper = new MyRequestWrapper((HttpServletRequest) servletRequest);
        ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper((HttpServletResponse) servletResponse);
        log.info("ip:{} method:{} path:{} req:{}",
                servletRequest.getRemoteHost(),
                ((HttpServletRequest) servletRequest).getMethod(),
                requestWrapper.getServletPath(),
                requestWrapper.getBody()
        );
        filterChain.doFilter(requestWrapper, responseWrapper);
        String responseBody = new String(responseWrapper.getContentAsByteArray(), responseWrapper.getCharacterEncoding());
        if (responseBody.startsWith("{\"code\":")) {
            log.info("ip:{} method:{} path:{} res:{}",
                    requestWrapper.getRemoteHost(),
                    ((HttpServletRequest) servletRequest).getMethod(),
                    requestWrapper.getServletPath(),
                    responseBody
            );
        }
        responseWrapper.copyBodyToResponse();
    }
}
