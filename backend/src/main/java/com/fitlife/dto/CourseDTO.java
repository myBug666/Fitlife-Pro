package com.fitlife.dto;

import lombok.Data;

import java.math.BigDecimal;

/**
 * 课程数据传输对象
 */
@Data
public class CourseDTO {

    /**
     * 课程名称
     */
    private String name;

    /**
     * 课程描述
     */
    private String description;

    /**
     * 课程图片
     */
    private String image;

    /**
     * 课程分类ID
     */
    private Long categoryId;

    /**
     * 教练ID
     */
    private Long coachId;

    /**
     * 课程时长（分钟）
     */
    private Integer duration;

    /**
     * 课程价格
     */
    private BigDecimal price;

    /**
     * 最大预约人数
     */
    private Integer maxPeople;

    /**
     * 课程标签（用逗号分隔）
     */
    private String tags;

    /**
     * 课程类型：0-团课，1-私教
     */
    private Integer type;

    /**
     * 课程难度：0-初级，1-中级，2-高级
     */
    private Integer difficulty;
}
