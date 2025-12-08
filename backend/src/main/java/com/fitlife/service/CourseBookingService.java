package com.fitlife.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fitlife.entity.CourseBooking;
import com.fitlife.entity.PageResult;
import com.fitlife.dto.CourseBookingDTO;
import com.fitlife.dto.CourseBookingQueryDTO;

import java.util.List;

/**
 * 课程预约服务接口
 */
public interface CourseBookingService extends IService<CourseBooking> {

    /**
     * 分页查询课程预约列表
     * @param queryDTO 查询条件
     * @return 分页结果
     */
    PageResult<CourseBooking> listCourseBookings(CourseBookingQueryDTO queryDTO);

    /**
     * 获取课程预约详情
     * @param bookingId 预约ID
     * @return 课程预约信息
     */
    CourseBooking getCourseBookingById(Long bookingId);

    /**
     * 预约课程
     * @param bookingDTO 预约信息
     * @return 预约信息
     */
    CourseBooking bookCourse(CourseBookingDTO bookingDTO);

    /**
     * 取消预约
     * @param bookingId 预约ID
     * @return 是否成功
     */
    boolean cancelBooking(Long bookingId);

    /**
     * 完成预约
     * @param bookingId 预约ID
     * @return 是否成功
     */
    boolean completeBooking(Long bookingId);

    /**
     * 根据会员ID查询课程预约列表
     * @param memberId 会员ID
     * @return 课程预约列表
     */
    List<CourseBooking> getCourseBookingsByMemberId(Long memberId);

    /**
     * 根据课程ID查询课程预约列表
     * @param courseId 课程ID
     * @return 课程预约列表
     */
    List<CourseBooking> getCourseBookingsByCourseId(Long courseId);

    /**
     * 根据课程时间安排ID查询课程预约列表
     * @param scheduleId 课程时间安排ID
     * @return 课程预约列表
     */
    List<CourseBooking> getCourseBookingsByScheduleId(Long scheduleId);

    /**
     * 检查会员是否已经预约了该课程时间安排
     * @param memberId 会员ID
     * @param scheduleId 课程时间安排ID
     * @return 是否已预约
     */
    boolean checkMemberBooked(Long memberId, Long scheduleId);

    /**
     * 支付预约
     * @param bookingId 预约ID
     * @param amount 支付金额
     * @return 是否成功
     */
    boolean payBooking(Long bookingId, java.math.BigDecimal amount);
}
