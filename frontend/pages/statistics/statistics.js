// pages/statistics/statistics.js
import { apiService } from '../../services/apiService.js';
import { chartUtils } from '../../utils/chartUtils.js';

Page({
  data: {
    user: null,
    selectedMonth: new Date().toISOString().substring(0, 7),
    statistics: {
      totalAttend: 0,
      totalHours: 0,
      completionRate: 0,
      attendanceTrend: []
    },
    charts: {
      barChart: null,
      lineChart: null
    },
    recentActivities: []
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
        this.loadStatistics();
        this.loadRecentActivities();
      } else {
        // 如果没有登录信息，跳转到登录页
        console.log('没有找到用户信息，跳转到登录页');
        wx.redirectTo({ url: '/pages/login/login' });
      }
    } catch (error) {
      console.error('初始化统计页面失败:', error);
      // 发生错误时，尝试从本地存储获取用户信息
      try {
        const userInfoStr = wx.getStorageSync('userInfo');
        if (userInfoStr) {
          const user = JSON.parse(userInfoStr);
          this.setData({ user });
          this.loadStatistics();
          this.loadRecentActivities();
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

  loadStatistics: async function() {
    try {
      wx.showLoading({ title: '加载中...' });
      const statistics = await apiService.getUserStatistics(
        this.data.user.id,
        this.data.selectedMonth
      );
      
      this.setData({ statistics });
      
      // 在下一个渲染周期绘制图表
      this.drawCharts();
    } catch (error) {
      console.error('加载统计失败', error);
      wx.showToast({ title: '加载统计失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  },

  loadRecentActivities: async function() {
    try {
      const activities = await apiService.getUserActivities(
        this.data.user.id,
        5
      );
      this.setData({ recentActivities: activities });
    } catch (error) {
      console.error('加载活动失败', error);
    }
  },

  drawCharts: function() {
    // 柱状图
    if (this.data.statistics.courseTypeDistribution) {
      chartUtils.drawBarChart(
        '#courseTypeChart',
        this.data.statistics.courseTypeDistribution
      );
    }
    
    // 折线图
    if (this.data.statistics.attendanceTrend.length > 0) {
      chartUtils.drawLineChart(
        '#attendanceTrendChart',
        this.data.statistics.attendanceTrend
      );
    }
  },

  onMonthChange: function(e) {
    this.setData({ selectedMonth: e.detail.value });
    this.loadStatistics();
  }
})