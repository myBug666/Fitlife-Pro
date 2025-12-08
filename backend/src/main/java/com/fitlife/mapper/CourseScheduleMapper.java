package com.fitlife.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fitlife.entity.CourseSchedule;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 课程预约时间安排数据访问接口
 */
@Mapper
public interface CourseScheduleMapper extends BaseMapper<CourseSchedule> {

    /**
     * 根据课程ID查询课程预约时间安排
     * @param courseId 课程ID
     * @return 课程预约时间安排列表
     */
    @Select("select * from course_schedule where course_id = #{courseId} and deleted = 0 order by start_time asc")
    List<CourseSchedule> selectByCourseId(Long courseId);

    /**
     * 查询指定时间范围内的课程预约时间安排
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 课程预约时间安排列表
     */
    @Select("select * from course_schedule where start_time >= #{startTime} and end_time <= #{endTime} and deleted = 0 order by start_time asc")
    List<CourseSchedule> selectByTimeRange(LocalDateTime startTime, LocalDateTime endTime);

    /**
     * 查询即将开始的课程预约时间安排
     * @param currentTime 当前时间
     * @param limit 查询数量
     * @return 课程预约时间安排列表
     */
    @Select("select * from course_schedule where start_time > #{currentTime} and status = 0 and deleted = 0 order by start_time asc limit #{limit}")
    List<CourseSchedule> selectUpcomingCourses(LocalDateTime currentTime, Integer limit);
}
