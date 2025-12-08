package com.fitlife.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fitlife.dto.CourseDTO;
import com.fitlife.dto.CourseQueryDTO;
import com.fitlife.entity.Course;
import com.fitlife.entity.PageResult;
import com.fitlife.exception.BusinessException;
import com.fitlife.mapper.CourseMapper;
import com.fitlife.service.CourseService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * 课程服务实现类
 */
@Service
public class CourseServiceImpl extends ServiceImpl<CourseMapper, Course> implements CourseService {

    @Autowired
    private CourseMapper courseMapper;

    @Override
    public PageResult<Course> listCourses(CourseQueryDTO queryDTO) {
        // 构建查询条件
        LambdaQueryWrapper<Course> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Course::getDeleted, 0);

        // 课程名称模糊查询
        if (StringUtils.hasText(queryDTO.getName())) {
            queryWrapper.like(Course::getName, queryDTO.getName());
        }

        // 分类ID查询
        if (queryDTO.getCategoryId() != null) {
            queryWrapper.eq(Course::getCategoryId, queryDTO.getCategoryId());
        }

        // 教练ID查询
        if (queryDTO.getCoachId() != null) {
            queryWrapper.eq(Course::getCoachId, queryDTO.getCoachId());
        }

        // 课程状态查询
        if (queryDTO.getStatus() != null) {
            queryWrapper.eq(Course::getStatus, queryDTO.getStatus());
        }

        // 课程类型查询
        if (queryDTO.getType() != null) {
            queryWrapper.eq(Course::getType, queryDTO.getType());
        }

        // 课程难度查询
        if (queryDTO.getDifficulty() != null) {
            queryWrapper.eq(Course::getDifficulty, queryDTO.getDifficulty());
        }

        // 价格范围查询
        if (queryDTO.getMinPrice() != null) {
            queryWrapper.ge(Course::getPrice, queryDTO.getMinPrice());
        }
        if (queryDTO.getMaxPrice() != null) {
            queryWrapper.le(Course::getPrice, queryDTO.getMaxPrice());
        }

        // 创建时间排序
        queryWrapper.orderByDesc(Course::getCreateTime);

        // 分页查询
        Page<Course> page = new Page<>(queryDTO.getPageNum(), queryDTO.getPageSize());
        IPage<Course> coursePage = courseMapper.selectPage(page, queryWrapper);

        // 构建分页结果
        return new PageResult<>(coursePage.getRecords(), coursePage.getTotal(), coursePage.getSize(), coursePage.getCurrent());
    }

    @Override
    public Course getCourseById(Long courseId) {
        Course course = courseMapper.selectById(courseId);
        if (course == null || course.getDeleted() == 1) {
            throw new BusinessException("课程不存在");
        }
        return course;
    }

    @Override
    public Course createCourse(CourseDTO courseDTO) {
        Course course = new Course();
        BeanUtils.copyProperties(courseDTO, course);
        course.setStatus(0); // 初始状态为未上架
        course.setBookedPeople(0); // 初始预约人数为0
        courseMapper.insert(course);
        return course;
    }

    @Override
    public Course updateCourse(Long courseId, CourseDTO courseDTO) {
        Course course = getCourseById(courseId);
        BeanUtils.copyProperties(courseDTO, course);
        course.setId(courseId); // 确保ID不变
        courseMapper.updateById(course);
        return course;
    }

    @Override
    public boolean publishCourse(Long courseId) {
        Course course = getCourseById(courseId);
        if (course.getStatus() == 1) {
            throw new BusinessException("课程已上架");
        }
        course.setStatus(1);
        return courseMapper.updateById(course) > 0;
    }

    @Override
    public boolean unpublishCourse(Long courseId) {
        Course course = getCourseById(courseId);
        if (course.getStatus() == 2) {
            throw new BusinessException("课程已下架");
        }
        course.setStatus(2);
        return courseMapper.updateById(course) > 0;
    }

    @Override
    public List<Course> getCoursesByCategoryId(Long categoryId) {
        return courseMapper.selectByCategoryId(categoryId);
    }

    @Override
    public List<Course> getHotCourses(Integer limit) {
        return courseMapper.selectHotCourses(limit);
    }

    @Override
    public List<Course> getCoursesByCoachId(Long coachId) {
        return courseMapper.selectByCoachId(coachId);
    }

    @Override
    public boolean updateBookedPeople(Long courseId, Integer delta) {
        Course course = getCourseById(courseId);
        // 检查是否超过最大预约人数
        if (delta > 0 && course.getBookedPeople() + delta > course.getMaxPeople()) {
            throw new BusinessException("课程预约人数已满");
        }
        // 更新预约人数
        course.setBookedPeople(course.getBookedPeople() + delta);
        return courseMapper.updateById(course) > 0;
    }
}
