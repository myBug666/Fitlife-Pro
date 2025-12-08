// pages/login/login.js
import { apiService } from '../../services/apiService.js';

Page({
  data: {
    loading: false
  },
  
  onLoad: function() {
    // 检查登录状态，添加错误处理
    try {
      const app = getApp();
      if (app && app.globalData && app.globalData.user) {
        wx.switchTab({ url: '/pages/booking/booking' });
      }
    } catch (error) {
      console.error('检查登录状态失败:', error);
      // 可以选择跳转到首页或继续停留在登录页
    }
  },
  
  handleWeChatLogin: async function() {
    this.setData({ loading: true });
    try {
      console.log('开始微信登录');
      // 调用微信登录接口
      const { code } = await wx.login();
      console.log('微信登录成功，code:', code);
      
      // 调用API服务登录
      console.log('开始调用apiService.login');
      const user = await apiService.login(code || 'mock_wx_code_123');
      console.log('API登录成功，user:', user);
      
      // 保存用户信息到本地
      wx.setStorageSync('userInfo', JSON.stringify(user));
      console.log('用户信息保存到本地成功');
      
      // 尝试保存到全局数据（添加错误处理）
      try {
        const app = getApp();
        console.log('获取app实例:', app);
        if (app && app.globalData) {
          app.globalData.user = user;
          console.log('用户信息保存到全局成功');
        }
      } catch (error) {
        console.error('保存用户信息到全局失败:', error);
        // 即使全局数据保存失败，也继续登录流程
      }
      
      // 跳转到首页 - 使用setTimeout确保所有异步操作完成
      console.log('准备跳转页面:', '/pages/booking/booking');
      
      setTimeout(() => {
        // 直接使用微信小程序原生API
        console.log('使用wx.switchTab跳转');
        wx.switchTab({
          url: '/pages/booking/booking',
          success: () => {
            console.log('wx.switchTab跳转成功');
          },
          fail: (err) => {
            console.error('wx.switchTab跳转失败:', err);
            console.log('尝试使用wx.redirectTo跳转');
            // 尝试使用redirectTo作为备选方案
            wx.redirectTo({
              url: '/pages/booking/booking',
              success: () => {
                console.log('wx.redirectTo跳转成功');
              },
              fail: (redirectErr) => {
                console.error('wx.redirectTo跳转也失败:', redirectErr);
                // 显示错误提示
                wx.showToast({ title: '跳转失败，请手动返回', icon: 'none' });
              }
            });
          }
        });
      }, 100);
    } catch (e) {
      console.error('登录失败:', e);
      wx.showToast({ title: '登录失败', icon: 'none' });
    } finally {
      this.setData({ loading: false });
      console.log('登录流程结束');
    }
  }
})