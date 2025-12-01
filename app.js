//app.js
App({
  globalData: {
    user: null
  },
  onLaunch: function () {
    // 检查登录状态
    try {
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.globalData.user = JSON.parse(userInfo);
      }
    } catch (e) {
      console.error('获取用户信息失败', e);
    }
    
    // 全局处理__route__未定义的问题 - 更完善的实现
    try {
      // 创建全局对象并设置__route__
      if (typeof global === 'undefined') {
        global = {};
      }
      global.__route__ = '';
      // 尝试设置到window对象
      if (typeof window !== 'undefined' && !window.global) {
        window.global = global;
      }
    } catch (e) {
      console.warn('设置全局__route__失败', e);
    }
  },
  
  // 页面加载时自动设置当前路由
  onPageNotFound: function(options) {
    console.log('页面未找到:', options);
  },
  
  // 全局错误处理 - 更健壮的实现
  onError: function(error) {
    console.error('全局错误:', error);
    
    // 处理__route__相关错误
    if (error && error.message && error.message.includes('__route__')) {
      try {
        // 多种方式尝试创建和设置__route__
        if (typeof global === 'undefined') {
          // 尝试在全局作用域定义
          self.__route__ = '';
          // 尝试创建global对象
          global = { __route__: '' };
        } else {
          global.__route__ = '';
        }
        
        // 尝试设置到任何可能的全局对象
        if (typeof window !== 'undefined') {
          window.__route__ = '';
          window.global = window.global || { __route__: '' };
        }
        
        if (typeof self !== 'undefined') {
          self.__route__ = '';
        }
        
        console.log('已成功设置__route__');
      } catch (err) {
        console.warn('在错误处理中设置__route__失败', err);
      }
    }
  }
})