package com.fitlife.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 分页结果类
 */
@Data
public class PageResult<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 数据列表
     */
    private List<T> records;

    /**
     * 总记录数
     */
    private long total;

    /**
     * 每页大小
     */
    private long size;

    /**
     * 当前页码
     */
    private long current;

    /**
     * 总页数
     */
    private long pages;

    /**
     * 构造方法
     * @param records 数据列表
     * @param total 总记录数
     * @param size 每页大小
     * @param current 当前页码
     */
    public PageResult(List<T> records, long total, long size, long current) {
        this.records = records;
        this.total = total;
        this.size = size;
        this.current = current;
        this.pages = (total + size - 1) / size;
    }

    /**
     * 空结果
     * @param <T> 数据类型
     * @return PageResult
     */
    public static <T> PageResult<T> empty() {
        return new PageResult<>(null, 0, 10, 1);
    }
}