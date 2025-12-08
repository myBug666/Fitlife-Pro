// pages/profile/profile.js
import { apiService } from '../../services/apiService.js';

Page({
  data: {
    user: null,
    membershipInfo: {
      level: '普通会员',
      expireDate: '2024-12-31',
      remainingDays: 180
    },
    settings: [
      {
        id: 'personalInfo',
        title: '个人信息',
        icon: 'user',
        showArrow: true
      },
      {
        id: 'notification',
        title: '通知设置',
        icon: 'notifications',
        showArrow: true
      },
      {
        id: 'privacy',
        title: '隐私设置',
        icon: 'shield',
        showArrow: true
      },
      {
        id: 'help',
        title: '帮助与反馈',
        icon: 'help',
        showArrow: true
      },
      {
        id: 'about',
        title: '关于我们',
        icon: 'info',
        showArrow: true
      }
    ]
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
        this.loadMembershipInfo();
      } else {
        // 如果没有登录信息，跳转到登录页
        console.log('没有找到用户信息，跳转到登录页');
        wx.redirectTo({ url: '/pages/login/login' });
      }
    } catch (error) {
      console.error('初始化个人中心页面失败:', error);
      // 发生错误时，尝试从本地存储获取用户信息
      try {
        const userInfoStr = wx.getStorageSync('userInfo');
        if (userInfoStr) {
          const user = JSON.parse(userInfoStr);
          this.setData({ user });
          this.loadMembershipInfo();
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

  loadMembershipInfo: async function() {
    try {
      const membershipInfo = await apiService.getMembershipInfo(this.data.user.id);
      this.setData({ membershipInfo });
    } catch (error) {
      console.error('加载会员信息失败', error);
    }
  },

  handleSettingClick: function(e) {
    const settingId = e.currentTarget.dataset.id;
    
    // 根据设置项ID进行不同操作
    switch(settingId) {
      case 'personalInfo':
        wx.navigateTo({ url: '/pages/profile/editProfile' });
        break;
      case 'notification':
        wx.navigateTo({ url: '/pages/profile/notifications' });
        break;
      case 'privacy':
        wx.navigateTo({ url: '/pages/profile/privacy' });
        break;
      case 'help':
        wx.navigateTo({ url: '/pages/profile/help' });
        break;
      case 'about':
        wx.navigateTo({ url: '/pages/profile/about' });
        break;
      default:
        break;
    }
  },

  handleLogout: function() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          try {
            const app = getApp();
            if (app && app.globalData) {
              app.globalData.user = null;
            }
          } catch (error) {
            console.error('清除全局用户信息失败:', error);
          }
          wx.removeStorageSync('userInfo');
          wx.redirectTo({ url: '/pages/login/login' });
        }
      }
    });
  },

  handleEditAvatar: function() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        // 这里可以调用上传头像的API
        this.updateAvatar(tempFilePath);
      }
    });
  },

  updateAvatar: async function(filePath) {
    try {
      wx.showLoading({ title: '上传中...' });
      // 这里应该调用上传头像的API
      // const newAvatarUrl = await apiService.uploadAvatar(this.data.user.id, filePath);
      
      // 模拟更新头像
      const app = getApp();
      if (app && app.globalData && app.globalData.user) {
        app.globalData.user.avatarUrl = filePath;
        this.setData({ user: app.globalData.user });
      }
      
      wx.showToast({ title: '头像更新成功' });
    } catch (error) {
      console.error('更新头像失败', error);
      wx.showToast({ title: '更新头像失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  }
})