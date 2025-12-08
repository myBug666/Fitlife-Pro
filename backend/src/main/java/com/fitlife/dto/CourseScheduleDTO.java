package com.fitlife.dto;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 课程预约时间安排数据传输对象
 */
@Data
public class CourseScheduleDTO {

    /**
     * 课程ID
     */
    private Long courseId;

    /**
     * 上课时间
     */
    private LocalDateTime startTime;

    /**
     * 下课时间
     */
    private LocalDateTime endTime;

    /**
     * 上课地点
     */
    private String location;

    /**
     * 最大预约人数
     */
    private Integer maxPeople;

    /**
     * 课程状态：0-未开始，1-进行中，2-已结束，3-已取消
     */
    private Integer status;
}
