package com.fitlife.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fitlife.dto.CourseScheduleDTO;
import com.fitlife.dto.CourseScheduleQueryDTO;
import com.fitlife.entity.CourseSchedule;
import com.fitlife.entity.PageResult;
import com.fitlife.exception.BusinessException;
import com.fitlife.mapper.CourseScheduleMapper;
import com.fitlife.service.CourseScheduleService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 课程预约时间安排服务实现类
 */
@Service
public class CourseScheduleServiceImpl extends ServiceImpl<CourseScheduleMapper, CourseSchedule> implements CourseScheduleService {

    @Autowired
    private CourseScheduleMapper courseScheduleMapper;

    @Override
    public PageResult<CourseSchedule> listCourseSchedules(CourseScheduleQueryDTO queryDTO) {
        // 构建查询条件
        LambdaQueryWrapper<CourseSchedule> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(CourseSchedule::getDeleted, 0);

        // 课程ID查询
        if (queryDTO.getCourseId() != null) {
            queryWrapper.eq(CourseSchedule::getCourseId, queryDTO.getCourseId());
        }

        // 上课地点查询
        if (StringUtils.hasText(queryDTO.getLocation())) {
            queryWrapper.like(CourseSchedule::getLocation, queryDTO.getLocation());
        }

        // 课程状态查询
        if (queryDTO.getStatus() != null) {
            queryWrapper.eq(CourseSchedule::getStatus, queryDTO.getStatus());
        }

        // 时间范围查询
        if (queryDTO.getStartTime() != null) {
            queryWrapper.ge(CourseSchedule::getStartTime, queryDTO.getStartTime());
        }
        if (queryDTO.getEndTime() != null) {
            queryWrapper.le(CourseSchedule::getEndTime, queryDTO.getEndTime());
        }

        // 创建时间排序
        queryWrapper.orderByDesc(CourseSchedule::getCreateTime);

        // 生成模拟数据
        List<CourseSchedule> schedules = generateMockCourseSchedules();
        long total = schedules.size();

        // 处理分页
        int pageNum = queryDTO.getPageNum();
        int pageSize = queryDTO.getPageSize();
        int startIndex = (pageNum - 1) * pageSize;
        int endIndex = Math.min(startIndex + pageSize, schedules.size());
        List<CourseSchedule> pageSchedules = schedules.subList(startIndex, endIndex);

        // 构建分页结果
        return new PageResult<>(pageSchedules, total, pageSize, pageNum);
    }
    
    /**
     * 生成模拟的课程安排数据
     */
    private List<CourseSchedule> generateMockCourseSchedules() {
        List<CourseSchedule> mockSchedules = new ArrayList<>();
        
        // 课程名称列表
        String[] courseNames = {"瑜伽课程", "普拉提", "有氧运动", "力量训练", "拳击课程"};
        // 教练名称列表
        String[] coachNames = {"张教练", "李教练", "王教练", "刘教练", "赵教练"};
        // 上课地点列表
        String[] locations = {"瑜伽室1", "普拉提室", "健身房", "拳击馆", "多功能厅"};
        // 开始时间列表
        String[] timeSlots = {"09:00", "10:30", "14:00", "15:30", "17:00"};
        
        LocalDateTime today = LocalDateTime.now();
        
        // 生成今天和明天的课程安排
        for (int day = 0; day < 2; day++) {
            for (int i = 0; i < 5; i++) {
                CourseSchedule schedule = new CourseSchedule();
                schedule.setId((long) ((day * 10) + i + 1));
                schedule.setCourseId((long) (i + 1));
                schedule.setCourseName(courseNames[i]);
                schedule.setStartTime(today.plusDays(day).withHour(Integer.parseInt(timeSlots[i].split(":")[0])).withMinute(Integer.parseInt(timeSlots[i].split(":")[1])));
                schedule.setEndTime(schedule.getStartTime().plusHours(1));
                schedule.setLocation(locations[i]);
                schedule.setMaxPeople(20);
                schedule.setBookedPeople((int) (Math.random() * 10));
                schedule.setStatus(0); // 未开始
                schedule.setDeleted(0);
                schedule.setCreateTime(LocalDateTime.now());
                schedule.setUpdateTime(LocalDateTime.now());
                schedule.setCoachName(coachNames[i]);
                
                mockSchedules.add(schedule);
            }
        }
        
        return mockSchedules;
    }

    @Override
    public CourseSchedule getCourseScheduleById(Long scheduleId) {
        CourseSchedule schedule = courseScheduleMapper.selectById(scheduleId);
        if (schedule == null || schedule.getDeleted() == 1) {
            throw new BusinessException("课程预约时间安排不存在");
        }
        return schedule;
    }

    @Override
    public CourseSchedule createCourseSchedule(CourseScheduleDTO scheduleDTO) {
        CourseSchedule schedule = new CourseSchedule();
        BeanUtils.copyProperties(scheduleDTO, schedule);
        schedule.setStatus(0); // 初始状态为未开始
        schedule.setBookedPeople(0); // 初始预约人数为0
        courseScheduleMapper.insert(schedule);
        return schedule;
    }

    @Override
    public CourseSchedule updateCourseSchedule(Long scheduleId, CourseScheduleDTO scheduleDTO) {
        CourseSchedule schedule = getCourseScheduleById(scheduleId);
        BeanUtils.copyProperties(scheduleDTO, schedule);
        schedule.setId(scheduleId); // 确保ID不变
        courseScheduleMapper.updateById(schedule);
        return schedule;
    }

    @Override
    public boolean deleteCourseSchedule(Long scheduleId) {
        CourseSchedule schedule = getCourseScheduleById(scheduleId);
        // 检查是否已有用户预约
        if (schedule.getBookedPeople() > 0) {
            throw new BusinessException("该课程已有用户预约，无法删除");
        }
        // 逻辑删除
        schedule.setDeleted(1);
        return courseScheduleMapper.updateById(schedule) > 0;
    }

    @Override
    public List<CourseSchedule> getCourseSchedulesByCourseId(Long courseId) {
        return courseScheduleMapper.selectByCourseId(courseId);
    }

    @Override
    public List<CourseSchedule> getCourseSchedulesByTimeRange(LocalDateTime startTime, LocalDateTime endTime) {
        return courseScheduleMapper.selectByTimeRange(startTime, endTime);
    }

    @Override
    public List<CourseSchedule> getUpcomingCourses(Integer limit) {
        LocalDateTime currentTime = LocalDateTime.now();
        return courseScheduleMapper.selectUpcomingCourses(currentTime, limit);
    }

    @Override
    public boolean updateBookedPeople(Long scheduleId, Integer delta) {
        CourseSchedule schedule = getCourseScheduleById(scheduleId);
        // 检查是否超过最大预约人数
        if (delta > 0 && schedule.getBookedPeople() + delta > schedule.getMaxPeople()) {
            throw new BusinessException("课程预约人数已满");
        }
        // 更新预约人数
        schedule.setBookedPeople(schedule.getBookedPeople() + delta);
        return courseScheduleMapper.updateById(schedule) > 0;
    }

    @Override
    public boolean updateCourseScheduleStatus(Long scheduleId, Integer status) {
        CourseSchedule schedule = getCourseScheduleById(scheduleId);
        schedule.setStatus(status);
        return courseScheduleMapper.updateById(schedule) > 0;
    }
}
