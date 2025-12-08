package com.fitlife.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fitlife.entity.Course;
import com.fitlife.entity.PageResult;
import com.fitlife.dto.CourseDTO;
import com.fitlife.dto.CourseQueryDTO;

import java.util.List;

/**
 * 课程服务接口
 */
public interface CourseService extends IService<Course> {

    /**
     * 分页查询课程列表
     * @param queryDTO 查询条件
     * @return 分页结果
     */
    PageResult<Course> listCourses(CourseQueryDTO queryDTO);

    /**
     * 获取课程详情
     * @param courseId 课程ID
     * @return 课程信息
     */
    Course getCourseById(Long courseId);

    /**
     * 创建课程
     * @param courseDTO 课程信息
     * @return 课程信息
     */
    Course createCourse(CourseDTO courseDTO);

    /**
     * 更新课程
     * @param courseId 课程ID
     * @param courseDTO 课程信息
     * @return 课程信息
     */
    Course updateCourse(Long courseId, CourseDTO courseDTO);

    /**
     * 上架课程
     * @param courseId 课程ID
     * @return 是否成功
     */
    boolean publishCourse(Long courseId);

    /**
     * 下架课程
     * @param courseId 课程ID
     * @return 是否成功
     */
    boolean unpublishCourse(Long courseId);

    /**
     * 根据分类ID查询课程列表
     * @param categoryId 分类ID
     * @return 课程列表
     */
    List<Course> getCoursesByCategoryId(Long categoryId);

    /**
     * 查询热门课程列表
     * @param limit 查询数量
     * @return 课程列表
     */
    List<Course> getHotCourses(Integer limit);

    /**
     * 根据教练ID查询课程列表
     * @param coachId 教练ID
     * @return 课程列表
     */
    List<Course> getCoursesByCoachId(Long coachId);

    /**
     * 更新课程预约人数
     * @param courseId 课程ID
     * @param delta 变化量（正数增加，负数减少）
     * @return 是否成功
     */
    boolean updateBookedPeople(Long courseId, Integer delta);
}
