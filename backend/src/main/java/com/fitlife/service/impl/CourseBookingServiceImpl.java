package com.fitlife.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fitlife.dto.CourseBookingDTO;
import com.fitlife.dto.CourseBookingQueryDTO;
import com.fitlife.entity.CourseBooking;
import com.fitlife.entity.CourseSchedule;
import com.fitlife.entity.PageResult;
import com.fitlife.exception.BusinessException;
import com.fitlife.mapper.CourseBookingMapper;
import com.fitlife.service.CourseBookingService;
import com.fitlife.service.CourseScheduleService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 课程预约服务实现类
 */
@Service
public class CourseBookingServiceImpl extends ServiceImpl<CourseBookingMapper, CourseBooking> implements CourseBookingService {

    @Autowired
    private CourseBookingMapper courseBookingMapper;

    @Autowired
    private CourseScheduleService courseScheduleService;

    @Override
    public PageResult<CourseBooking> listCourseBookings(CourseBookingQueryDTO queryDTO) {
        // 构建查询条件
        LambdaQueryWrapper<CourseBooking> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(CourseBooking::getDeleted, 0);

        // 会员ID查询
        if (queryDTO.getMemberId() != null) {
            queryWrapper.eq(CourseBooking::getMemberId, queryDTO.getMemberId());
        }

        // 课程ID查询
        if (queryDTO.getCourseId() != null) {
            queryWrapper.eq(CourseBooking::getCourseId, queryDTO.getCourseId());
        }

        // 课程时间安排ID查询
        if (queryDTO.getScheduleId() != null) {
            queryWrapper.eq(CourseBooking::getScheduleId, queryDTO.getScheduleId());
        }

        // 预约状态查询
        if (queryDTO.getStatus() != null) {
            queryWrapper.eq(CourseBooking::getStatus, queryDTO.getStatus());
        }

        // 支付状态查询
        if (queryDTO.getPayStatus() != null) {
            queryWrapper.eq(CourseBooking::getPayStatus, queryDTO.getPayStatus());
        }

        // 创建时间排序
        queryWrapper.orderByDesc(CourseBooking::getCreateTime);

        // 分页查询
        Page<CourseBooking> page = new Page<>(queryDTO.getPageNum(), queryDTO.getPageSize());
        IPage<CourseBooking> bookingPage = courseBookingMapper.selectPage(page, queryWrapper);

        // 构建分页结果
        return new PageResult<>(bookingPage.getRecords(), bookingPage.getTotal(), bookingPage.getSize(), bookingPage.getCurrent());
    }

    @Override
    public CourseBooking getCourseBookingById(Long bookingId) {
        CourseBooking booking = courseBookingMapper.selectById(bookingId);
        if (booking == null || booking.getDeleted() == 1) {
            throw new BusinessException("预约不存在");
        }
        return booking;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public CourseBooking bookCourse(CourseBookingDTO bookingDTO) {
        // 检查是否已经预约
        CourseBooking existingBooking = courseBookingMapper.selectByMemberIdAndScheduleId(bookingDTO.getMemberId(), bookingDTO.getScheduleId());
        if (existingBooking != null) {
            throw new BusinessException("您已经预约了该课程");
        }

        // 获取课程时间安排
        CourseSchedule schedule = courseScheduleService.getCourseScheduleById(bookingDTO.getScheduleId());

        // 检查课程时间安排是否已过期
        if (schedule.getStartTime().isBefore(LocalDateTime.now())) {
            throw new BusinessException("课程已过期，无法预约");
        }

        // 检查课程时间安排是否已取消
        if (schedule.getStatus() == 3) {
            throw new BusinessException("课程已取消，无法预约");
        }

        // 检查是否超过最大预约人数
        if (schedule.getBookedPeople() >= schedule.getMaxPeople()) {
            throw new BusinessException("课程预约人数已满");
        }

        // 创建预约
        CourseBooking booking = new CourseBooking();
        BeanUtils.copyProperties(bookingDTO, booking);
        booking.setStatus(1); // 初始状态为已预约
        booking.setPayStatus(0); // 初始支付状态为未支付
        courseBookingMapper.insert(booking);

        // 更新课程时间安排的预约人数
        courseScheduleService.updateBookedPeople(bookingDTO.getScheduleId(), 1);

        return booking;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean cancelBooking(Long bookingId) {
        CourseBooking booking = getCourseBookingById(bookingId);

        // 检查是否可以取消（只能取消未开始的课程）
        CourseSchedule schedule = courseScheduleService.getCourseScheduleById(booking.getScheduleId());
        if (schedule.getStartTime().isBefore(LocalDateTime.now())) {
            throw new BusinessException("课程已开始或已结束，无法取消");
        }

        // 更新预约状态
        booking.setStatus(2); // 取消预约
        boolean updateResult = courseBookingMapper.updateById(booking) > 0;

        // 更新课程时间安排的预约人数
        if (updateResult) {
            courseScheduleService.updateBookedPeople(booking.getScheduleId(), -1);
        }

        return updateResult;
    }

    @Override
    public boolean completeBooking(Long bookingId) {
        CourseBooking booking = getCourseBookingById(bookingId);
        // 更新预约状态为已完成
        booking.setStatus(3);
        return courseBookingMapper.updateById(booking) > 0;
    }

    @Override
    public List<CourseBooking> getCourseBookingsByMemberId(Long memberId) {
        return courseBookingMapper.selectByMemberId(memberId);
    }

    @Override
    public List<CourseBooking> getCourseBookingsByCourseId(Long courseId) {
        return courseBookingMapper.selectByCourseId(courseId);
    }

    @Override
    public List<CourseBooking> getCourseBookingsByScheduleId(Long scheduleId) {
        return courseBookingMapper.selectByScheduleId(scheduleId);
    }

    @Override
    public boolean checkMemberBooked(Long memberId, Long scheduleId) {
        CourseBooking booking = courseBookingMapper.selectByMemberIdAndScheduleId(memberId, scheduleId);
        return booking != null;
    }

    @Override
    public boolean payBooking(Long bookingId, java.math.BigDecimal amount) {
        CourseBooking booking = getCourseBookingById(bookingId);
        // 更新支付状态
        booking.setPayStatus(1);
        booking.setAmount(amount);
        booking.setPayTime(LocalDateTime.now());
        return courseBookingMapper.updateById(booking) > 0;
    }
}
