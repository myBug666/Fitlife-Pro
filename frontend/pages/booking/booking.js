// pages/booking/booking.js
import { apiService } from '../../services/apiService.js';

Page({
  data: {
    user: null,
    selectedDate: new Date().toISOString().split('T')[0],
    courses: [],
    myBookings: new Set(),
    dates: []
  },

  onLoad: function() {
    try {
      let user = null;
      
      // 先尝试从全局数据获取用户信息
      const app = getApp();
      if (app && app.globalData && app.globalData.user) {
        user = app.globalData.user;
        console.log('从全局数据获取到用户信息');
      } else {
        // 从本地存储获取用户信息
        const userInfoStr = wx.getStorageSync('userInfo');
        if (userInfoStr) {
          user = JSON.parse(userInfoStr);
          console.log('从本地存储获取到用户信息:', user);
          
          // 更新到全局数据
          if (app && app.globalData) {
            app.globalData.user = user;
            console.log('更新用户信息到全局数据');
          }
        }
      }
      
      if (user) {
        this.setData({ user });
        this.generateDates();
        this.loadCourses();
      } else {
        // 如果没有登录信息，跳转到登录页
        console.log('没有找到用户信息，跳转到登录页');
        wx.redirectTo({ url: '/pages/login/login' });
      }
    } catch (error) {
      console.error('初始化课程页面失败:', error);
      // 发生错误时，尝试从本地存储获取用户信息
      try {
        const userInfoStr = wx.getStorageSync('userInfo');
        if (userInfoStr) {
          const user = JSON.parse(userInfoStr);
          this.setData({ user });
          this.generateDates();
          this.loadCourses();
        } else {
          wx.redirectTo({ url: '/pages/login/login' });
        }
      } catch (retryError) {
        console.error('重试获取用户信息也失败:', retryError);
        wx.redirectTo({ url: '/pages/login/login' });
      }
    }
  },

  onShow: function() {
    try {
      const app = getApp();
      if (app && app.globalData && app.globalData.user) {
        this.setData({ user: app.globalData.user });
      }
    } catch (error) {
      console.error('更新用户信息失败:', error);
    }
  },

  generateDates: function() {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        full: d.toISOString().split('T')[0],
        day: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()],
        date: d.getDate()
      });
    }
    this.setData({ dates });
  },

  onDateSelect: function(e) {
    const date = e.currentTarget.dataset.date;
    this.setData({ selectedDate: date });
    this.loadCourses(date);
  },

  loadCourses: async function(date) {
    try {
      const courses = await apiService.getCourses(date || this.data.selectedDate);
      this.setData({ courses });
    } catch (error) {
      console.error('加载课程失败', error);
      wx.showToast({ title: '加载课程失败', icon: 'none' });
    }
  },

  checkConflict: function(targetCourse) {
    const bookedCourses = this.data.courses.filter(c => this.data.myBookings.has(c.id));
    
    for (const booked of bookedCourses) {
      if (booked.id === targetCourse.id) continue;
      
      const toMin = (t) => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
      };
      
      const targetStart = toMin(targetCourse.timeStart);
      const targetEnd = toMin(targetCourse.timeEnd);
      const bookedStart = toMin(booked.timeStart);
      const bookedEnd = toMin(booked.timeEnd);

      if (targetStart < bookedEnd && targetEnd > bookedStart) {
        return true;
      }
    }
    return false;
  },

  handleBook: async function(e) {
    const scheduleId = e.currentTarget.dataset.id;
    const course = this.data.courses.find(c => c.id === scheduleId);
    
    if (this.data.myBookings.has(scheduleId)) {
      wx.showToast({ title: '已预约此课程', icon: 'none' });
      return;
    }
    
    if (this.checkConflict(course)) {
      wx.showToast({ title: '预约冲突！您在此时段已有课程', icon: 'none' });
      return;
    }

    try {
      wx.showLoading({ title: '预约中...' });
      // 这里需要传递4个参数：courseId, userId, scheduleId, amount
      // 假设课程ID是scheduleId，amount设置为0（如果需要实际价格，应该从course对象中获取）
      const result = await apiService.bookCourse(scheduleId, this.data.user.id, scheduleId, 0);
      
      if (result && result.success) {
        const myBookings = new Set(this.data.myBookings);
        myBookings.add(scheduleId);
        this.setData({ myBookings });
        wx.showToast({ title: `✅ ${course.name} 预约成功！` });
      } else {
        wx.showToast({ title: '预约失败，请稍后重试', icon: 'none' });
      }
    } catch (error) {
      console.error('预约失败', error);
      wx.showToast({ title: '预约失败，请稍后重试', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  }
})