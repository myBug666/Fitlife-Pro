import { Course, User, BodyMetric } from "../types";
import { MOCK_COURSES, MOCK_USER, MOCK_BODY_DATA } from "../constants";

/**
 * SERVICE LAYER
 * This simulates calls to a Spring Boot 2.7 + MySQL 8.0 Backend
 * Base URL: https://api.fitclub.com/v1
 */

// Simulated delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟网络错误
const simulateError = (errorRate: number = 0.1): boolean => {
  return Math.random() < errorRate;
};

export const ApiService = {
  /**
   * 会员登录接口
   * POST /member/login
   * 微信授权登录，返回JWT Token和用户信息
   */
  login: async (code: string): Promise<{ token: string; user: User }> => {
    await delay(800);
    
    if (simulateError()) {
      throw new Error('Login failed: Invalid code or network error');
    }
    
    console.log(`[API] POST /member/login - WeChat code: ${code}`);
    
    // 模拟返回JWT Token和用户信息
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDAwMSIsIm5hbWUiOiLmvJTlkI0gKEFsZXgpIiwiaWF0IjoxNjM3NTY5NjAwLCJleHAiOjE2Mzc2NTYwMDB9.mock_token_signature`;
    
    return {
      token,
      user: MOCK_USER
    };
  },

  /**
   * 获取用户信息
   * GET /member/info
   */
  getUserInfo: async (): Promise<User> => {
    await delay(300);
    
    if (simulateError()) {
      throw new Error('Failed to fetch user info');
    }
    
    console.log(`[API] GET /member/info`);
    return MOCK_USER;
  },

  /**
   * 更新用户信息
   * PUT /member/info
   */
  updateUserInfo: async (userData: Partial<User>): Promise<User> => {
    await delay(600);
    
    if (simulateError()) {
      throw new Error('Failed to update user info');
    }
    
    console.log(`[API] PUT /member/info - Data:`, userData);
    return { ...MOCK_USER, ...userData };
  },

  /**
   * 获取课程列表
   * GET /course?date=2025-12-05&page=1&size=10
   */
  getCourses: async (date: string, page: number = 1, size: number = 10): Promise<{ total: number; list: Course[] }> => {
    await delay(500);
    
    if (simulateError()) {
      throw new Error('Failed to fetch courses');
    }
    
    console.log(`[API] GET /course?date=${date}&page=${page}&size=${size}`);
    
    // 模拟分页
    const courses = MOCK_COURSES.map(c => ({...c, date}));
    return {
      total: courses.length,
      list: courses
    };
  },

  /**
   * 获取课程详情
   * GET /course/{id}
   */
  getCourseDetail: async (courseId: string): Promise<Course> => {
    await delay(400);
    
    if (simulateError()) {
      throw new Error('Failed to fetch course detail');
    }
    
    console.log(`[API] GET /course/${courseId}`);
    
    const course = MOCK_COURSES.find(c => c.id === courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    
    return course;
  },

  /**
   * 预约课程
   * POST /booking/create
   * @Transactional 事务保证数据一致性
   */
  bookCourse: async (courseId: string, userId: string, paymentMethod: string): Promise<{ bookingId: string; success: boolean }> => {
    await delay(1000);
    
    if (simulateError(0.2)) { // 20% 错误率
      throw new Error('Booking failed: Insufficient seats or payment error');
    }
    
    console.log(`[API] POST /booking/create - Course: ${courseId}, User: ${userId}, Payment: ${paymentMethod}`);
    
    // 模拟生成预约ID
    const bookingId = `BK${Date.now()}`;
    
    return {
      bookingId,
      success: true
    };
  },

  /**
   * 取消预约
   * POST /booking/cancel
   */
  cancelBooking: async (bookingId: string): Promise<boolean> => {
    await delay(600);
    
    if (simulateError()) {
      throw new Error('Failed to cancel booking');
    }
    
    console.log(`[API] POST /booking/cancel - Booking ID: ${bookingId}`);
    return true;
  },

  /**
   * 获取用户预约列表
   * GET /booking/user/{userId}?status=upcoming|completed
   */
  getUserBookings: async (userId: string, status: 'upcoming' | 'completed' = 'upcoming'): Promise<Course[]> => {
    await delay(500);
    
    if (simulateError()) {
      throw new Error('Failed to fetch user bookings');
    }
    
    console.log(`[API] GET /booking/user/${userId}?status=${status}`);
    // 返回模拟数据
    return MOCK_COURSES.slice(0, 2);
  },

  /**
   * 获取会员卡信息
   * GET /member/card
   */
  getMemberCard: async (): Promise<any> => {
    await delay(400);
    
    if (simulateError()) {
      throw new Error('Failed to fetch member card');
    }
    
    console.log(`[API] GET /member/card`);
    
    // 返回模拟会员卡信息
    return {
      cardNumber: `MC${MOCK_USER.id}`,
      cardType: MOCK_USER.cardType,
      balance: MOCK_USER.balance,
      points: MOCK_USER.points,
      expireDate: MOCK_USER.expireDate,
      benefits: [
        { name: '课程折扣', description: '所有课程享受9折优惠' },
        { name: '免费停车', description: '每次训练可免费停车2小时' },
        { name: '私教优惠', description: '购买私教课享受85折' }
      ]
    };
  },

  /**
   * 会员卡充值
   * POST /member/card/recharge
   */
  rechargeMemberCard: async (amount: number, paymentMethod: string): Promise<{ success: boolean; newBalance: number }> => {
    await delay(800);
    
    if (simulateError()) {
      throw new Error('Recharge failed: Payment error');
    }
    
    console.log(`[API] POST /member/card/recharge - Amount: ${amount}, Method: ${paymentMethod}`);
    
    const newBalance = MOCK_USER.balance + amount;
    return {
      success: true,
      newBalance
    };
  },

  /**
   * 获取积分记录
   * GET /member/points/history
   */
  getPointsHistory: async (page: number = 1, size: number = 20): Promise<{ total: number; list: any[] }> => {
    await delay(500);
    
    if (simulateError()) {
      throw new Error('Failed to fetch points history');
    }
    
    console.log(`[API] GET /member/points/history?page=${page}&size=${size}`);
    
    // 模拟积分记录
    const history = [
      { id: '1', type: 'earn', points: 100, reason: '课程签到', date: '2024-01-15' },
      { id: '2', type: 'spend', points: 500, reason: '兑换健身装备', date: '2024-01-10' },
      { id: '3', type: 'earn', points: 100, reason: '课程签到', date: '2024-01-08' }
    ];
    
    return {
      total: history.length,
      list: history
    };
  },

  /**
   * 获取体测数据
   * GET /member/body-metrics?startDate=2024-01-01&endDate=2024-12-31
   */
  getBodyMetrics: async (startDate: string, endDate: string): Promise<BodyMetric[]> => {
    await delay(600);
    
    if (simulateError()) {
      throw new Error('Failed to fetch body metrics');
    }
    
    console.log(`[API] GET /member/body-metrics?startDate=${startDate}&endDate=${endDate}`);
    return MOCK_BODY_DATA;
  },

  /**
   * 发送订阅消息
   * POST /notification/subscribe
   */
  subscribeNotification: async (templateId: string, data: any): Promise<boolean> => {
    await delay(500);
    
    if (simulateError()) {
      throw new Error('Failed to subscribe notification');
    }
    
    console.log(`[API] POST /notification/subscribe - Template: ${templateId}`);
    return true;
  },

  /**
   * 通用错误处理
   */
  handleError: (error: any): string => {
    if (error.response) {
      // 服务器返回错误状态码
      return error.response.data.message || '服务器错误，请稍后重试';
    } else if (error.request) {
      // 请求已发送但没有收到响应
      return '网络连接失败，请检查网络设置';
    } else {
      // 请求配置出错
      return error.message || '请求失败，请稍后重试';
    }
  }
};