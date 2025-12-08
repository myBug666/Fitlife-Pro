package com.fitlife.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fitlife.entity.CourseBooking;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 课程预约数据访问接口
 */
@Mapper
public interface CourseBookingMapper extends BaseMapper<CourseBooking> {

    /**
     * 根据会员ID查询课程预约列表
     * @param memberId 会员ID
     * @return 课程预约列表
     */
    @Select("select * from course_booking where member_id = #{memberId} and deleted = 0 order by create_time desc")
    List<CourseBooking> selectByMemberId(Long memberId);

    /**
     * 根据课程ID查询课程预约列表
     * @param courseId 课程ID
     * @return 课程预约列表
     */
    @Select("select * from course_booking where course_id = #{courseId} and deleted = 0 order by create_time desc")
    List<CourseBooking> selectByCourseId(Long courseId);

    /**
     * 根据课程时间安排ID查询课程预约列表
     * @param scheduleId 课程时间安排ID
     * @return 课程预约列表
     */
    @Select("select * from course_booking where schedule_id = #{scheduleId} and deleted = 0 order by create_time desc")
    List<CourseBooking> selectByScheduleId(Long scheduleId);

    /**
     * 根据会员ID和课程时间安排ID查询课程预约
     * @param memberId 会员ID
     * @param scheduleId 课程时间安排ID
     * @return 课程预约
     */
    @Select("select * from course_booking where member_id = #{memberId} and schedule_id = #{scheduleId} and deleted = 0")
    CourseBooking selectByMemberIdAndScheduleId(Long memberId, Long scheduleId);
}
