// utils/router.js
import { env } from './env.js';

/**
 * 统一路由工具，支持微信小程序和Web环境
 */
export const router = {
  /**
   * 跳转到指定页面
   * @param {string} url - 页面路径
   * @param {Object} options - 跳转选项
   */
  navigateTo: (url, options = {}) => {
    if (env.isWxMiniProgram) {
      // 微信小程序环境
      return new Promise((resolve, reject) => {
        wx.navigateTo({
          url,
          success: () => resolve(),
          fail: (err) => reject(err),
          ...options
        });
      });
    } else if (env.isWeb) {
      // Web环境
      console.log('Web环境导航到:', url);
      // 如果有React Router，可以使用history.push
      if (typeof window !== 'undefined') {
        window.location.href = url;
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error('未知环境，无法跳转'));
  },

  /**
   * 重定向到指定页面（关闭当前页面）
   * @param {string} url - 页面路径
   * @param {Object} options - 跳转选项
   */
  redirectTo: (url, options = {}) => {
    if (env.isWxMiniProgram) {
      // 微信小程序环境
      return new Promise((resolve, reject) => {
        wx.redirectTo({
          url,
          success: () => resolve(),
          fail: (err) => reject(err),
          ...options
        });
      });
    } else if (env.isWeb) {
      // Web环境
      console.log('Web环境重定向到:', url);
      if (typeof window !== 'undefined') {
        window.location.replace(url);
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error('未知环境，无法跳转'));
  },

  /**
   * 跳转到tabBar页面（关闭所有非tabBar页面）
   * @param {string} url - 页面路径
   * @param {Object} options - 跳转选项
   */
  switchTab: (url, options = {}) => {
    if (env.isWxMiniProgram) {
      // 微信小程序环境
      return new Promise((resolve, reject) => {
        wx.switchTab({
          url,
          success: () => resolve(),
          fail: (err) => reject(err),
          ...options
        });
      });
    } else if (env.isWeb) {
      // Web环境
      console.log('Web环境切换到tab页面:', url);
      if (typeof window !== 'undefined') {
        window.location.href = url;
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error('未知环境，无法跳转'));
  }
};
