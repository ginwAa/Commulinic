package com.commulinic.exception.handler;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.commulinic.constant.MessageConstant;
import com.commulinic.entity.result.Result;
import com.commulinic.exception.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.sql.SQLIntegrityConstraintViolationException;

import static com.commulinic.constant.MessageConstant.REQUEST_PARAMS_TYPE_MISMATCH;
import static com.commulinic.constant.MessageConstant.REQUEST_RESOURCE_NOT_FOUND;

/**
 * 全局异常处理器，处理项目中抛出的业务异常
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 捕获业务异常
     *
     * @param ex
     * @return
     */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Result exceptionHandler(BaseException ex) {
        log.error("异常信息：{}", ex.getMessage());
        return Result.error(ex.getMessage());
    }

    /**
     * 处理SQL异常
     *
     * @param ex
     * @return
     */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Result sqlExceptionHandler(SQLIntegrityConstraintViolationException ex) {
        String exMsg = ex.getMessage();
        if (exMsg.contains("Duplicate entry")) {
            String[] split = exMsg.split(" ");
            String username = split[2];
            String msg = username + MessageConstant.ALREADY_EXIST;
            return Result.error(msg);
        } else {
            return Result.error(MessageConstant.UNKNOWN_ERROR);
        }
    }


    @ExceptionHandler(value = JWTVerificationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Result unauthorizedExceptionHandler(Exception ex) {
        return Result.error(ex.getMessage());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoHandlerFoundException.class)
    public <T> Result<T> processException(NoHandlerFoundException e) {
        log.error(e.getMessage(), e);
        return Result.error(REQUEST_RESOURCE_NOT_FOUND);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public <T> Result<T> processException(MethodArgumentTypeMismatchException e) {
        log.error(e.getMessage(), e);
        return Result.error(REQUEST_PARAMS_TYPE_MISMATCH);
    }
}
