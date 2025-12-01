// pages/login/login.js
import { apiService } from '../../services/apiService.js';

Page({
  data: {
    loading: false
  },
  
  onLoad: function() {
    // 检查登录状态
    const app = getApp();
    if (app.globalData.user) {
      wx.switchTab({ url: '/pages/booking/booking' });
    }
  },
  
  handleWeChatLogin: async function() {
    this.setData({ loading: true });
    try {
      // 调用微信登录接口
      const { code } = await wx.login();
      
      // 调用API服务登录
      const user = await apiService.login(code || 'mock_wx_code_123');
      
      // 保存用户信息到全局和本地
      const app = getApp();
      app.globalData.user = user;
      wx.setStorageSync('userInfo', JSON.stringify(user));
      
      // 跳转到首页
      wx.switchTab({ url: '/pages/booking/booking' });
    } catch (e) {
      wx.showToast({ title: '登录失败', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  }
})