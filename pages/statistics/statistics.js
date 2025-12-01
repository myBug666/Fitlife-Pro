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
    const app = getApp();
    if (!app.globalData.user) {
      wx.redirectTo({ url: '/pages/login/login' });
      return;
    }
    
    this.setData({ user: app.globalData.user });
    this.loadStatistics();
    this.loadRecentActivities();
  },

  onShow: function() {
    const app = getApp();
    this.setData({ user: app.globalData.user });
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