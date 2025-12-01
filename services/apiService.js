// services/apiService.js
const API_BASE_URL = 'https://api.fitlife.com/v1';
// 引入mock服务，用于在API不可用时提供模拟数据
import { mockDataService } from './mockDataService.js';
// 是否启用mock模式
const USE_MOCK = true;

/**
 * 封装wx.request，处理请求头、身份验证和通用错误
 */
const request = async (options) => {
  // 获取存储的token
  const token = wx.getStorageSync('token');

  // 默认请求头
  const header = {
    'Content-Type': 'application/json',
    ...options.header
  };

  // 如果有token，添加到请求头
  if (token) {
    header.Authorization = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header: header,
      timeout: options.timeout || 10000,
      success: (res) => {
        // 处理业务错误
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (res.data.code === 0) {
            resolve(res.data.data);
          } else {
            wx.showToast({ title: res.data.message || '请求失败', icon: 'none' });
            reject(new Error(res.data.message || '请求失败'));
          }
        } else if (res.statusCode === 401) {
          // 未授权，跳转到登录页
          wx.removeStorageSync('token');
          wx.redirectTo({ url: '/pages/login/login' });
          reject(new Error('登录已过期，请重新登录'));
        } else {
          wx.showToast({ title: `服务器错误: ${res.statusCode}`, icon: 'none' });
          reject(new Error(`服务器错误: ${res.statusCode}`));
        }
      },
      fail: (err) => {
        wx.showToast({ title: '网络连接失败', icon: 'none' });
        reject(err);
      }
    });
  });
};

/**
 * 用户登录
 * @param {string} code - 微信登录code
 * @returns {Promise<Object>} 用户信息
 */
export const login = async (code) => {
  // 如果启用mock模式，直接返回mock数据
  if (USE_MOCK) {
    return mockDataService.login(code);
  }
  
  try {
    return await request({
      url: '/auth/login',
      method: 'POST',
      data: { code }
    });
  } catch (error) {
    console.warn('API调用失败，使用mock数据:', error);
    return mockDataService.login(code);
  }
};

/**
 * 获取课程列表
 * @param {string} date - 日期 (YYYY-MM-DD)
 * @returns {Promise<Array>} 课程列表
 */
export const getCourses = async (date) => {
  // 如果启用mock模式，直接返回mock数据
  if (USE_MOCK) {
    return mockDataService.getCourses(date);
  }
  
  try {
    return await request({
      url: `/courses?date=${date}`
    });
  } catch (error) {
    console.warn('API调用失败，使用mock数据:', error);
    return mockDataService.getCourses(date);
  }
};

/**
 * 预约课程
 * @param {number} courseId - 课程ID
 * @param {number} userId - 用户ID
 * @returns {Promise<boolean>} 是否预约成功
 */
export const bookCourse = async (courseId, userId) => {
  // 如果启用mock模式，直接返回mock数据
  if (USE_MOCK) {
    return mockDataService.bookCourse(courseId, userId);
  }
  
  try {
    return await request({
      url: '/bookings',
      method: 'POST',
      data: {
        courseId,
        userId
      }
    });
  } catch (error) {
    console.warn('API调用失败，使用mock数据:', error);
    return mockDataService.bookCourse(courseId, userId);
  }
};

/**
 * 获取用户统计数据
 * @param {number} userId - 用户ID
 * @param {string} month - 月份 (YYYY-MM)
 * @returns {Promise<Object>} 统计数据
 */
export const getUserStatistics = async (userId, month) => {
  // 如果启用mock模式，直接返回mock数据
  if (USE_MOCK) {
    return mockDataService.getUserStatistics(userId, month);
  }
  
  try {
    return await request({
      url: `/users/${userId}/statistics?month=${month}`
    });
  } catch (error) {
    console.warn('API调用失败，使用mock数据:', error);
    return mockDataService.getUserStatistics(userId, month);
  }
};

/**
 * 获取用户近期活动
 * @param {number} userId - 用户ID
 * @param {number} limit - 限制数量
 * @returns {Promise<Array>} 活动列表
 */
export const getUserActivities = async (userId, limit) => {
  // 如果启用mock模式，直接返回mock数据
  if (USE_MOCK) {
    return mockDataService.getUserActivities(userId, limit);
  }
  
  try {
    return await request({
      url: `/users/${userId}/activities?limit=${limit}`
    });
  } catch (error) {
    console.warn('API调用失败，使用mock数据:', error);
    return mockDataService.getUserActivities(userId, limit);
  }
};

/**
 * 获取会员信息
 * @param {number} userId - 用户ID
 * @returns {Promise<Object>} 会员信息
 */
export const getMembershipInfo = async (userId) => {
  // 如果启用mock模式，直接返回mock数据
  if (USE_MOCK) {
    return mockDataService.getMembershipInfo(userId);
  }
  
  try {
    return await request({
      url: `/users/${userId}/membership`
    });
  } catch (error) {
    console.warn('API调用失败，使用mock数据:', error);
    return mockDataService.getMembershipInfo(userId);
  }
};

/**
 * 导出apiService实例
 */
export const apiService = {
  login,
  getCourses,
  bookCourse,
  getUserStatistics,
  getUserActivities,
  getMembershipInfo
};