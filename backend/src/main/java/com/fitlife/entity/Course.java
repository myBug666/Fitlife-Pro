package com.fitlife.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 课程表
 */
@Data
@TableName("course")
public class Course implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 课程ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 课程名称
     */
    @TableField("name")
    private String name;

    /**
     * 课程描述
     */
    @TableField("description")
    private String description;

    /**
     * 课程图片
     */
    @TableField("image")
    private String image;

    /**
     * 课程分类ID
     */
    @TableField("category_id")
    private Long categoryId;

    /**
     * 教练ID
     */
    @TableField("coach_id")
    private Long coachId;

    /**
     * 课程时长（分钟）
     */
    @TableField("duration")
    private Integer duration;

    /**
     * 课程价格
     */
    @TableField("price")
    private BigDecimal price;

    /**
     * 课程状态：0-未上架，1-已上架，2-已下架
     */
    @TableField("status")
    private Integer status;

    /**
     * 最大预约人数
     */
    @TableField("max_people")
    private Integer maxPeople;

    /**
     * 已预约人数
     */
    @TableField("booked_people")
    private Integer bookedPeople;

    /**
     * 课程标签（用逗号分隔）
     */
    @TableField("tags")
    private String tags;

    /**
     * 课程类型：0-团课，1-私教
     */
    @TableField("type")
    private Integer type;

    /**
     * 课程难度：0-初级，1-中级，2-高级
     */
    @TableField("difficulty")
    private Integer difficulty;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    @TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    /**
     * 删除标记：0-正常，1-删除
     */
    @TableLogic
    @TableField("deleted")
    private Integer deleted;
}