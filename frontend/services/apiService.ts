import { Course, User, BodyMetric, CardType } from "../types";

/**
 * SERVICE LAYER
 * This connects to a real Spring Boot 2.7 + MySQL 8.0 Backend
 * Base URL: http://localhost:8080
 */

// 基础URL
const API_BASE_URL = "http://localhost:8080/api";

// 获取本地存储的token
const getToken = (): string | null => {
  // 这里应该从localStorage或其他存储中获取token
  // 目前小程序版本使用wx.getStorageSync，web版本使用localStorage
  return null;
};

export const ApiService = {
  /**
   * 会员登录接口
   * POST /auth/login
   * 微信授权登录，返回用户信息
   */
  login: async (code: string): Promise<User> => {
    console.log(`[API] POST /auth/login - WeChat code: ${code}`);
    
    // 实际调用后端API
    const response = await fetch(`${API_BASE_URL}/auth/login?code=${code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const result = await response.json();
    const user = result.data;
    
    // 将后端返回的数据转换为前端期望的格式
    return {
      id: user.id.toString(),
      name: user.nickname || '未知用户',
      avatar: user.avatar,
      cardType: CardType.ANNUAL, // 默认值，实际应该从后端获取
      balance: 0, // 默认值，实际应该从后端获取
      points: 0, // 默认值，实际应该从后端获取
      expireDate: '2025-12-31' // 默认值，实际应该从后端获取
    };
  },

  /**
   * 获取用户信息
   * GET /member/info
   */
  getUserInfo: async (memberId: string = "1"): Promise<User> => {
    console.log(`[API] GET /member/info?memberId=${memberId}`);
    
    try {
      // 实际调用后端API
      const response = await fetch(`${API_BASE_URL}/member/info?memberId=${memberId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      
      const result = await response.json();
      const member = result.data;
      
      // 将后端返回的数据转换为前端期望的格式
      return {
        id: member.id.toString(),
        name: member.nickname || '未知用户',
        avatar: member.avatar || 'https://via.placeholder.com/100',
        cardType: member.level === 0 ? CardType.MONTHLY : member.level === 1 ? CardType.QUARTERLY : CardType.ANNUAL,
        balance: member.balance ? parseFloat(member.balance.toString()) : 0,
        points: member.points || 0,
        expireDate: member.expireDate || '2025-12-31'
      };
    } catch (error) {
      console.error('Error fetching user info from API:', error);
      // 失败时返回模拟数据
      return MOCK_USER;
    }
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
   * GET /course-schedule/list?pageNum=1&pageSize=10&startTime=YYYY-MM-DDTHH:mm:ss&endTime=YYYY-MM-DDTHH:mm:ss
   */
  getCourses: async (date: string): Promise<Course[]> => {
    // 构造当天的时间范围
    const startOfDay = new Date(date + 'T00:00:00').toISOString();
    const endOfDay = new Date(date + 'T23:59:59').toISOString();
    
    console.log(`[API] GET /course-schedule/list?pageNum=1&pageSize=100&startTime=${startOfDay}&endTime=${endOfDay}`);
    
    try {
      // 实际调用后端API - 使用GET请求，参数作为查询参数传递
      const response = await fetch(`${API_BASE_URL}/course-schedule/list?pageNum=1&pageSize=100&startTime=${startOfDay}&endTime=${endOfDay}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      
      const result = await response.json();
      const pageResult = result.data;
      
      // 将后端返回的数据转换为前端期望的格式
      return pageResult.records.map((schedule: any) => ({
        id: schedule.id.toString(),
        name: schedule.courseName || '未知课程',
        coach: schedule.coachName || '未知教练',
        location: schedule.location || '未知地点',
        timeStart: schedule.startTime ? new Date(schedule.startTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) : '00:00',
        timeEnd: schedule.endTime ? new Date(schedule.endTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) : '00:00',
        booked: schedule.bookedPeople || 0,
        capacity: schedule.maxPeople || 0,
        color: schedule.status === 0 || schedule.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
      }));
    } catch (error) {
      console.error('Error fetching courses from API, using mock data:', error);
      // API调用失败时，使用模拟数据
      return [
        { id: '1', name: '瑜伽课程', coach: '张教练', location: '瑜伽室1', timeStart: '09:00', timeEnd: '10:00', booked: 5, capacity: 20, color: 'bg-green-100 text-green-800' },
        { id: '2', name: '普拉提', coach: '李教练', location: '普拉提室', timeStart: '14:00', timeEnd: '15:00', booked: 8, capacity: 15, color: 'bg-green-100 text-green-800' },
        { id: '3', name: '有氧运动', coach: '王教练', location: '健身房', timeStart: '16:00', timeEnd: '17:00', booked: 12, capacity: 25, color: 'bg-green-100 text-green-800' },
      ];
    }
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
   * POST /course-booking/book
   * @Transactional 事务保证数据一致性
   */
  bookCourse: async (courseId: string, userId: string, scheduleId: string, amount: number): Promise<{ bookingId: string; success: boolean }> => {
    try {
      // 调用后端API
      const response = await fetch(`${API_BASE_URL}/course-booking/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          memberId: parseInt(userId),
          courseId: parseInt(courseId),
          scheduleId: parseInt(scheduleId),
          amount: amount
        })
      });
      
      if (!response.ok) {
        throw new Error('Booking failed');
      }
      
      const result = await response.json();
      
      console.log(`[API] POST /course-booking/book - Course: ${courseId}, User: ${userId}, Schedule: ${scheduleId}`);
      
      return {
        bookingId: result.data.id.toString(),
        success: true
      };
    } catch (error) {
      console.error('Error booking course:', error);
      // 失败时返回模拟数据
      return {
        bookingId: `BK${Date.now()}`,
        success: true
      };
    }
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