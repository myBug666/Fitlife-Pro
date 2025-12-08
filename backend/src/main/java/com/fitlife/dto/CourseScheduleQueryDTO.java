package com.fitlife.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * 课程预约时间安排查询条件DTO
 */
@Data
public class CourseScheduleQueryDTO {

    /**
     * 页码
     */
    private Integer pageNum = 1;

    /**
     * 每页数量
     */
    private Integer pageSize = 10;

    /**
     * 课程ID
     */
    private Long courseId;

    /**
     * 上课地点
     */
    private String location;

    /**
     * 课程状态：0-未开始，1-进行中，2-已结束，3-已取消
     */
    private Integer status;

    /**
     * 开始时间
     */
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime startTime;

    /**
     * 结束时间
     */
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime endTime;
}
