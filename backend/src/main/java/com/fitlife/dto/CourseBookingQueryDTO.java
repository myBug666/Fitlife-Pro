package com.fitlife.dto;

import lombok.Data;

/**
 * 课程预约查询条件DTO
 */
@Data
public class CourseBookingQueryDTO {

    /**
     * 页码
     */
    private Integer pageNum = 1;

    /**
     * 每页数量
     */
    private Integer pageSize = 10;

    /**
     * 会员ID
     */
    private Long memberId;

    /**
     * 课程ID
     */
    private Long courseId;

    /**
     * 课程时间安排ID
     */
    private Long scheduleId;

    /**
     * 预约状态：0-待付款，1-已预约，2-已取消，3-已完成，4-已过期
     */
    private Integer status;

    /**
     * 支付状态：0-未支付，1-已支付
     */
    private Integer payStatus;
}
