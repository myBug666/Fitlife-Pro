package com.fitlife.controller;

import com.fitlife.entity.CourseBooking;
import com.fitlife.entity.PageResult;
import com.fitlife.entity.Result;
import com.fitlife.dto.CourseBookingDTO;
import com.fitlife.dto.CourseBookingQueryDTO;
import com.fitlife.service.CourseBookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * 课程预约控制器
 */
@Tag(name = "课程预约管理", description = "课程预约相关接口")
@RestController
@RequestMapping("/course-booking")
public class CourseBookingController {

    @Autowired
    private CourseBookingService courseBookingService;

    @Operation(summary = "分页查询课程预约列表", description = "根据条件分页查询课程预约列表")
    @Parameters({
            @Parameter(name = "pageNum", description = "页码", example = "1"),
            @Parameter(name = "pageSize", description = "每页数量", example = "10"),
            @Parameter(name = "memberId", description = "会员ID"),
            @Parameter(name = "courseId", description = "课程ID"),
            @Parameter(name = "scheduleId", description = "课程时间安排ID"),
            @Parameter(name = "status", description = "预约状态：0-待付款，1-已预约，2-已取消，3-已完成，4-已过期"),
            @Parameter(name = "payStatus", description = "支付状态：0-未支付，1-已支付")
    })
    @GetMapping("/list")
    public Result<PageResult<CourseBooking>> listCourseBookings(CourseBookingQueryDTO queryDTO) {
        PageResult<CourseBooking> pageResult = courseBookingService.listCourseBookings(queryDTO);
        return Result.success(pageResult);
    }

    @Operation(summary = "获取课程预约详情", description = "根据预约ID获取课程预约详情")
    @GetMapping("/{bookingId}")
    public Result<CourseBooking> getCourseBookingById(
            @Parameter(description = "预约ID") @PathVariable Long bookingId) {
        CourseBooking booking = courseBookingService.getCourseBookingById(bookingId);
        return Result.success(booking);
    }

    @Operation(summary = "预约课程", description = "预约课程")
    @PostMapping("/book")
    public Result<CourseBooking> bookCourse(@RequestBody CourseBookingDTO bookingDTO) {
        CourseBooking booking = courseBookingService.bookCourse(bookingDTO);
        return Result.success(booking);
    }

    @Operation(summary = "取消预约", description = "取消课程预约")
    @PutMapping("/{bookingId}/cancel")
    public Result<Boolean> cancelBooking(
            @Parameter(description = "预约ID") @PathVariable Long bookingId) {
        boolean result = courseBookingService.cancelBooking(bookingId);
        return Result.success(result);
    }

    @Operation(summary = "完成预约", description = "完成课程预约")
    @PutMapping("/{bookingId}/complete")
    public Result<Boolean> completeBooking(
            @Parameter(description = "预约ID") @PathVariable Long bookingId) {
        boolean result = courseBookingService.completeBooking(bookingId);
        return Result.success(result);
    }

    @Operation(summary = "根据会员查询预约", description = "根据会员ID查询课程预约列表")
    @GetMapping("/member/{memberId}")
    public Result<List<CourseBooking>> getCourseBookingsByMemberId(
            @Parameter(description = "会员ID") @PathVariable Long memberId) {
        List<CourseBooking> bookings = courseBookingService.getCourseBookingsByMemberId(memberId);
        return Result.success(bookings);
    }

    @Operation(summary = "支付预约", description = "支付课程预约")
    @Parameters({
            @Parameter(name = "bookingId", description = "预约ID"),
            @Parameter(name = "amount", description = "支付金额", example = "100.00")
    })
    @PutMapping("/{bookingId}/pay")
    public Result<Boolean> payBooking(
            @PathVariable Long bookingId,
            @RequestParam BigDecimal amount) {
        boolean result = courseBookingService.payBooking(bookingId, amount);
        return Result.success(result);
    }
}
