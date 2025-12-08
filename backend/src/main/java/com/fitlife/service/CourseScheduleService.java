package com.fitlife.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fitlife.entity.CourseSchedule;
import com.fitlife.entity.PageResult;
import com.fitlife.dto.CourseScheduleDTO;
import com.fitlife.dto.CourseScheduleQueryDTO;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 课程预约时间安排服务接口
 */
public interface CourseScheduleService extends IService<CourseSchedule> {

    /**
     * 分页查询课程预约时间安排列表
     * @param queryDTO 查询条件
     * @return 分页结果
     */
    PageResult<CourseSchedule> listCourseSchedules(CourseScheduleQueryDTO queryDTO);

    /**
     * 获取课程预约时间安排详情
     * @param scheduleId 课程预约时间安排ID
     * @return 课程预约时间安排信息
     */
    CourseSchedule getCourseScheduleById(Long scheduleId);

    /**
     * 创建课程预约时间安排
     * @param scheduleDTO 课程预约时间安排信息
     * @return 课程预约时间安排信息
     */
    CourseSchedule createCourseSchedule(CourseScheduleDTO scheduleDTO);

    /**
     * 更新课程预约时间安排
     * @param scheduleId 课程预约时间安排ID
     * @param scheduleDTO 课程预约时间安排信息
     * @return 课程预约时间安排信息
     */
    CourseSchedule updateCourseSchedule(Long scheduleId, CourseScheduleDTO scheduleDTO);

    /**
     * 删除课程预约时间安排
     * @param scheduleId 课程预约时间安排ID
     * @return 是否成功
     */
    boolean deleteCourseSchedule(Long scheduleId);

    /**
     * 根据课程ID查询课程预约时间安排列表
     * @param courseId 课程ID
     * @return 课程预约时间安排列表
     */
    List<CourseSchedule> getCourseSchedulesByCourseId(Long courseId);

    /**
     * 查询指定时间范围内的课程预约时间安排
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 课程预约时间安排列表
     */
    List<CourseSchedule> getCourseSchedulesByTimeRange(LocalDateTime startTime, LocalDateTime endTime);

    /**
     * 查询即将开始的课程预约时间安排
     * @param limit 查询数量
     * @return 课程预约时间安排列表
     */
    List<CourseSchedule> getUpcomingCourses(Integer limit);

    /**
     * 更新课程预约时间安排的预约人数
     * @param scheduleId 课程预约时间安排ID
     * @param delta 变化量（正数增加，负数减少）
     * @return 是否成功
     */
    boolean updateBookedPeople(Long scheduleId, Integer delta);

    /**
     * 更新课程预约时间安排状态
     * @param scheduleId 课程预约时间安排ID
     * @param status 状态：0-未开始，1-进行中，2-已结束，3-已取消
     * @return 是否成功
     */
    boolean updateCourseScheduleStatus(Long scheduleId, Integer status);
}
