package com.fitlife.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fitlife.entity.Course;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 课程数据访问接口
 */
@Mapper
public interface CourseMapper extends BaseMapper<Course> {

    /**
     * 根据分类ID查询课程列表
     * @param categoryId 分类ID
     * @return 课程列表
     */
    @Select("select * from course where category_id = #{categoryId} and status = 1 and deleted = 0 order by create_time desc")
    List<Course> selectByCategoryId(Long categoryId);

    /**
     * 查询热门课程列表
     * @param limit 查询数量
     * @return 课程列表
     */
    @Select("select * from course where status = 1 and deleted = 0 order by booked_people desc limit #{limit}")
    List<Course> selectHotCourses(Integer limit);

    /**
     * 根据教练ID查询课程列表
     * @param coachId 教练ID
     * @return 课程列表
     */
    @Select("select * from course where coach_id = #{coachId} and status = 1 and deleted = 0 order by create_time desc")
    List<Course> selectByCoachId(Long coachId);
}
