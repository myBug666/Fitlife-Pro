package com.fitlife.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 课程预约表
 */
@Data
@TableName("course_booking")
public class CourseBooking implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 预约ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 会员ID
     */
    @TableField("member_id")
    private Long memberId;

    /**
     * 课程ID
     */
    @TableField("course_id")
    private Long courseId;

    /**
     * 课程时间安排ID
     */
    @TableField("schedule_id")
    private Long scheduleId;

    /**
     * 预约状态：0-待付款，1-已预约，2-已取消，3-已完成，4-已过期
     */
    @TableField("status")
    private Integer status;

    /**
     * 支付状态：0-未支付，1-已支付
     */
    @TableField("pay_status")
    private Integer payStatus;

    /**
     * 支付金额
     */
    @TableField("amount")
    private java.math.BigDecimal amount;

    /**
     * 支付时间
     */
    @TableField("pay_time")
    private LocalDateTime payTime;

    /**
     * 预约时间
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
