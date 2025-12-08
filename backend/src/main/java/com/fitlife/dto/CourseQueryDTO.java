package com.fitlife.dto;

import lombok.Data;

import java.math.BigDecimal;

/**
 * 课程查询条件DTO
 */
@Data
public class CourseQueryDTO {

    /**
     * 页码
     */
    private Integer pageNum = 1;

    /**
     * 每页数量
     */
    private Integer pageSize = 10;

    /**
     * 课程名称
     */
    private String name;

    /**
     * 分类ID
     */
    private Long categoryId;

    /**
     * 教练ID
     */
    private Long coachId;

    /**
     * 课程状态：0-未上架，1-已上架，2-已下架
     */
    private Integer status;

    /**
     * 课程类型：0-团课，1-私教
     */
    private Integer type;

    /**
     * 课程难度：0-初级，1-中级，2-高级
     */
    private Integer difficulty;

    /**
     * 最低价格
     */
    private BigDecimal minPrice;

    /**
     * 最高价格
     */
    private BigDecimal maxPrice;
}
