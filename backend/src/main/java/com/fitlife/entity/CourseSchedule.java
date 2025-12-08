package com.fitlife.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 课程表
 */
@Data
@TableName("course_schedule")
public class CourseSchedule implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 课程表ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 课程ID
     */
    @TableField("course_id")
    private Long courseId;

    /**
     * 课程名称
     */
    @TableField(exist = false)
    private String courseName;

    /**
     * 教练名称
     */
    @TableField(exist = false)
    private String coachName;

    /**
     * 上课时间
     */
    @TableField("start_time")
    private LocalDateTime startTime;

    /**
     * 下课时间
     */
    @TableField("end_time")
    private LocalDateTime endTime;

    /**
     * 上课地点
     */
    @TableField("location")
    private String location;

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
     * 课程状态：0-未开始，1-进行中，2-已结束，3-已取消
     */
    @TableField("status")
    private Integer status;

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