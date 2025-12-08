package com.fitlife.dto;

import lombok.Data;

/**
 * 课程预约数据传输对象
 */
@Data
public class CourseBookingDTO {

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
     * 支付金额
     */
    private java.math.BigDecimal amount;
}
