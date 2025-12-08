package com.fitlife.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 统一响应结果类
 */
@Data
public class Result<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 状态码
     */
    private int code;

    /**
     * 响应消息
     */
    private String message;

    /**
     * 响应数据
     */
    private T data;

    /**
     * 时间戳
     */
    private long timestamp;

    public Result() {
        this.timestamp = new Date().getTime();
    }

    /**
     * 成功响应
     * @param data 响应数据
     * @param <T> 数据类型
     * @return Result
     */
    public static <T> Result<T> success(T data) {
        Result<T> result = new Result<>();
        result.setCode(200);
        result.setMessage("success");
        result.setData(data);
        return result;
    }

    /**
     * 成功响应
     * @param message 响应消息
     * @param data 响应数据
     * @param <T> 数据类型
     * @return Result
     */
    public static <T> Result<T> success(String message, T data) {
        Result<T> result = new Result<>();
        result.setCode(200);
        result.setMessage(message);
        result.setData(data);
        return result;
    }

    /**
     * 失败响应
     * @param code 状态码
     * @param message 响应消息
     * @param <T> 数据类型
     * @return Result
     */
    public static <T> Result<T> fail(int code, String message) {
        Result<T> result = new Result<>();
        result.setCode(code);
        result.setMessage(message);
        return result;
    }

    /**
     * 失败响应
     * @param message 响应消息
     * @param <T> 数据类型
     * @return Result
     */
    public static <T> Result<T> fail(String message) {
        return fail(400, message);
    }

    /**
     * 服务器错误
     * @param message 响应消息
     * @param <T> 数据类型
     * @return Result
     */
    public static <T> Result<T> error(String message) {
        return fail(500, message);
    }
}