package com.fitlife.controller;

import com.fitlife.entity.Course;
import com.fitlife.entity.PageResult;
import com.fitlife.entity.Result;
import com.fitlife.dto.CourseDTO;
import com.fitlife.dto.CourseQueryDTO;
import com.fitlife.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 课程控制器
 */
@Tag(name = "课程管理", description = "课程相关接口")
@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Operation(summary = "分页查询课程列表", description = "根据条件分页查询课程列表")
    @Parameters({
            @Parameter(name = "pageNum", description = "页码", example = "1"),
            @Parameter(name = "pageSize", description = "每页数量", example = "10"),
            @Parameter(name = "name", description = "课程名称"),
            @Parameter(name = "categoryId", description = "分类ID"),
            @Parameter(name = "coachId", description = "教练ID"),
            @Parameter(name = "status", description = "课程状态：0-未上架，1-已上架，2-已下架"),
            @Parameter(name = "type", description = "课程类型：0-团课，1-私教"),
            @Parameter(name = "difficulty", description = "课程难度：0-初级，1-中级，2-高级")
    })
    @GetMapping("/list")
    public Result<PageResult<Course>> listCourses(CourseQueryDTO queryDTO) {
        PageResult<Course> pageResult = courseService.listCourses(queryDTO);
        return Result.success(pageResult);
    }

    @Operation(summary = "获取课程详情", description = "根据课程ID获取课程详情")
    @GetMapping("/{courseId}")
    public Result<Course> getCourseById(
            @Parameter(description = "课程ID") @PathVariable Long courseId) {
        Course course = courseService.getCourseById(courseId);
        return Result.success(course);
    }

    @Operation(summary = "创建课程", description = "创建新课程")
    @PostMapping
    public Result<Course> createCourse(@RequestBody CourseDTO courseDTO) {
        Course course = courseService.createCourse(courseDTO);
        return Result.success(course);
    }

    @Operation(summary = "更新课程", description = "更新课程信息")
    @PutMapping("/{courseId}")
    public Result<Course> updateCourse(
            @Parameter(description = "课程ID") @PathVariable Long courseId,
            @RequestBody CourseDTO courseDTO) {
        Course course = courseService.updateCourse(courseId, courseDTO);
        return Result.success(course);
    }

    @Operation(summary = "上架课程", description = "上架指定课程")
    @PutMapping("/{courseId}/publish")
    public Result<Boolean> publishCourse(
            @Parameter(description = "课程ID") @PathVariable Long courseId) {
        boolean result = courseService.publishCourse(courseId);
        return Result.success(result);
    }

    @Operation(summary = "下架课程", description = "下架指定课程")
    @PutMapping("/{courseId}/unpublish")
    public Result<Boolean> unpublishCourse(
            @Parameter(description = "课程ID") @PathVariable Long courseId) {
        boolean result = courseService.unpublishCourse(courseId);
        return Result.success(result);
    }

    @Operation(summary = "根据分类查询课程", description = "根据分类ID查询课程列表")
    @GetMapping("/category/{categoryId}")
    public Result<List<Course>> getCoursesByCategoryId(
            @Parameter(description = "分类ID") @PathVariable Long categoryId) {
        List<Course> courses = courseService.getCoursesByCategoryId(categoryId);
        return Result.success(courses);
    }

    @Operation(summary = "获取热门课程", description = "获取热门课程列表")
    @GetMapping("/hot")
    public Result<List<Course>> getHotCourses(
            @Parameter(description = "查询数量", example = "10") @RequestParam(defaultValue = "10") Integer limit) {
        List<Course> courses = courseService.getHotCourses(limit);
        return Result.success(courses);
    }

    @Operation(summary = "根据教练查询课程", description = "根据教练ID查询课程列表")
    @GetMapping("/coach/{coachId}")
    public Result<List<Course>> getCoursesByCoachId(
            @Parameter(description = "教练ID") @PathVariable Long coachId) {
        List<Course> courses = courseService.getCoursesByCoachId(coachId);
        return Result.success(courses);
    }
}
