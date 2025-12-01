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
    const app = getApp();
    if (!app.globalData.user) {
      wx.redirectTo({ url: '/pages/login/login' });
      return;
    }
    
    this.setData({ user: app.globalData.user });
    this.generateDates();
    this.loadCourses();
  },

  onShow: function() {
    const app = getApp();
    this.setData({ user: app.globalData.user });
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
    const courseId = e.currentTarget.dataset.id;
    const course = this.data.courses.find(c => c.id === courseId);
    
    if (this.data.myBookings.has(courseId)) {
      wx.showToast({ title: '已预约此课程', icon: 'none' });
      return;
    }
    
    if (this.checkConflict(course)) {
      wx.showToast({ title: '预约冲突！您在此时段已有课程', icon: 'none' });
      return;
    }

    try {
      wx.showLoading({ title: '预约中...' });
      const success = await apiService.bookCourse(courseId, this.data.user.id);
      
      if (success) {
        const myBookings = new Set(this.data.myBookings);
        myBookings.add(courseId);
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