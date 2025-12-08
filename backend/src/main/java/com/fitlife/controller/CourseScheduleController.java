package com.fitlife.controller;

import com.fitlife.entity.CourseSchedule;
import com.fitlife.entity.PageResult;
import com.fitlife.entity.Result;
import com.fitlife.dto.CourseScheduleDTO;
import com.fitlife.dto.CourseScheduleQueryDTO;
import com.fitlife.service.CourseScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 课程预约时间安排控制器
 */
@Tag(name = "课程预约时间安排管理", description = "课程预约时间安排相关接口")
@RestController
@RequestMapping("/course-schedule")
public class CourseScheduleController {

    @Autowired
    private CourseScheduleService courseScheduleService;

    @Operation(summary = "分页查询课程预约时间安排列表", description = "根据条件分页查询课程预约时间安排列表")
    @Parameters({
            @Parameter(name = "pageNum", description = "页码", example = "1"),
            @Parameter(name = "pageSize", description = "每页数量", example = "10"),
            @Parameter(name = "courseId", description = "课程ID"),
            @Parameter(name = "location", description = "上课地点"),
            @Parameter(name = "status", description = "课程状态：0-未开始，1-进行中，2-已结束，3-已取消")
    })
    @GetMapping("/list")
    public Result<PageResult<CourseSchedule>> listCourseSchedules(CourseScheduleQueryDTO queryDTO) {
        PageResult<CourseSchedule> pageResult = courseScheduleService.listCourseSchedules(queryDTO);
        return Result.success(pageResult);
    }

    @Operation(summary = "获取课程预约时间安排详情", description = "根据课程预约时间安排ID获取详情")
    @GetMapping("/{scheduleId}")
    public Result<CourseSchedule> getCourseScheduleById(
            @Parameter(description = "课程预约时间安排ID") @PathVariable Long scheduleId) {
        CourseSchedule schedule = courseScheduleService.getCourseScheduleById(scheduleId);
        return Result.success(schedule);
    }

    @Operation(summary = "创建课程预约时间安排", description = "创建新课程预约时间安排")
    @PostMapping
    public Result<CourseSchedule> createCourseSchedule(@RequestBody CourseScheduleDTO scheduleDTO) {
        CourseSchedule schedule = courseScheduleService.createCourseSchedule(scheduleDTO);
        return Result.success(schedule);
    }

    @Operation(summary = "更新课程预约时间安排", description = "更新课程预约时间安排信息")
    @PutMapping("/{scheduleId}")
    public Result<CourseSchedule> updateCourseSchedule(
            @Parameter(description = "课程预约时间安排ID") @PathVariable Long scheduleId,
            @RequestBody CourseScheduleDTO scheduleDTO) {
        CourseSchedule schedule = courseScheduleService.updateCourseSchedule(scheduleId, scheduleDTO);
        return Result.success(schedule);
    }

    @Operation(summary = "删除课程预约时间安排", description = "删除课程预约时间安排")
    @DeleteMapping("/{scheduleId}")
    public Result<Boolean> deleteCourseSchedule(
            @Parameter(description = "课程预约时间安排ID") @PathVariable Long scheduleId) {
        boolean result = courseScheduleService.deleteCourseSchedule(scheduleId);
        return Result.success(result);
    }

    @Operation(summary = "根据课程查询时间安排", description = "根据课程ID查询课程预约时间安排列表")
    @GetMapping("/course/{courseId}")
    public Result<List<CourseSchedule>> getCourseSchedulesByCourseId(
            @Parameter(description = "课程ID") @PathVariable Long courseId) {
        List<CourseSchedule> schedules = courseScheduleService.getCourseSchedulesByCourseId(courseId);
        return Result.success(schedules);
    }

    @Operation(summary = "根据时间范围查询课程", description = "根据时间范围查询课程预约时间安排列表")
    @Parameters({
            @Parameter(name = "startTime", description = "开始时间", example = "2023-01-01 00:00:00"),
            @Parameter(name = "endTime", description = "结束时间", example = "2023-01-31 23:59:59")
    })
    @GetMapping("/time-range")
    public Result<List<CourseSchedule>> getCourseSchedulesByTimeRange(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {
        List<CourseSchedule> schedules = courseScheduleService.getCourseSchedulesByTimeRange(startTime, endTime);
        return Result.success(schedules);
    }

    @Operation(summary = "获取即将开始的课程", description = "获取即将开始的课程预约时间安排列表")
    @GetMapping("/upcoming")
    public Result<List<CourseSchedule>> getUpcomingCourses(
            @Parameter(description = "查询数量", example = "10") @RequestParam(defaultValue = "10") Integer limit) {
        List<CourseSchedule> schedules = courseScheduleService.getUpcomingCourses(limit);
        return Result.success(schedules);
    }

    @Operation(summary = "更新课程预约时间安排状态", description = "更新课程预约时间安排状态")
    @Parameters({
            @Parameter(name = "scheduleId", description = "课程预约时间安排ID"),
            @Parameter(name = "status", description = "状态：0-未开始，1-进行中，2-已结束，3-已取消", example = "0")
    })
    @PutMapping("/{scheduleId}/status")
    public Result<Boolean> updateCourseScheduleStatus(
            @PathVariable Long scheduleId,
            @RequestParam Integer status) {
        boolean result = courseScheduleService.updateCourseScheduleStatus(scheduleId, status);
        return Result.success(result);
    }
}
