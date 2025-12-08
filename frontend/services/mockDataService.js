// services/mockDataService.js

/**
 * Mock用户数据
 */
const mockUser = {
  id: 1001,
  nickname: '健身达人',
  avatarUrl: '/images/profile.png',
  phone: '138****1234',
  email: 'fitness@example.com'
};

/**
 * Mock会员信息
 */
const mockMembershipInfo = {
  level: '黄金会员',
  expireDate: '2024-12-31',
  remainingDays: 180
};

/**
 * 生成Mock课程数据
 * @param {string} date - 日期 (YYYY-MM-DD)
 * @returns {Array} 课程列表
 */
const generateMockCourses = (date) => {
  const courses = [
    {
      id: 1,
      name: '动感单车',
      trainer: '李教练',
      timeStart: '09:00',
      timeEnd: '10:00',
      room: '单车室',
      capacity: 20,
      bookedCount: 12,
      booked: false
    },
    {
      id: 2,
      name: '瑜伽',
      trainer: '张教练',
      timeStart: '10:30',
      timeEnd: '11:30',
      room: '瑜伽室',
      capacity: 15,
      bookedCount: 8,
      booked: false
    },
    {
      id: 3,
      name: '普拉提',
      trainer: '王教练',
      timeStart: '15:00',
      timeEnd: '16:00',
      room: '多功能厅',
      capacity: 10,
      bookedCount: 10,
      booked: true
    },
    {
      id: 4,
      name: 'HIIT燃脂',
      trainer: '赵教练',
      timeStart: '18:30',
      timeEnd: '19:30',
      room: '操房',
      capacity: 25,
      bookedCount: 15,
      booked: false
    },
    {
      id: 5,
      name: '力量训练',
      trainer: '钱教练',
      timeStart: '20:00',
      timeEnd: '21:00',
      room: '器械区',
      capacity: 15,
      bookedCount: 6,
      booked: false
    }
  ];

  return courses;
};

/**
 * 生成Mock统计数据
 * @param {number} userId - 用户ID
 * @param {string} month - 月份 (YYYY-MM)
 * @returns {Object} 统计数据
 */
const generateMockStatistics = (userId, month) => {
  return {
    totalAttend: 18,
    totalHours: 24,
    completionRate: 85,
    courseTypeDistribution: [
      { name: '瑜伽', value: 5 },
      { name: '动感单车', value: 4 },
      { name: '普拉提', value: 3 },
      { name: 'HIIT', value: 4 },
      { name: '力量训练', value: 2 }
    ],
    attendanceTrend: [
      { date: '01', value: 2 },
      { date: '07', value: 3 },
      { date: '14', value: 4 },
      { date: '21', value: 3 },
      { date: '28', value: 6 }
    ]
  };
};

/**
 * 生成Mock用户活动数据
 * @param {number} userId - 用户ID
 * @param {number} limit - 限制数量
 * @returns {Array} 活动列表
 */
const generateMockActivities = (userId, limit) => {
  return [
    {
      id: 1,
      courseName: '动感单车',
      date: '2024-01-15 09:00',
      status: 'attended'
    },
    {
      id: 2,
      courseName: '瑜伽',
      date: '2024-01-14 10:30',
      status: 'attended'
    },
    {
      id: 3,
      courseName: 'HIIT燃脂',
      date: '2024-01-16 18:30',
      status: 'booked'
    },
    {
      id: 4,
      courseName: '普拉提',
      date: '2024-01-13 15:00',
      status: 'attended'
    },
    {
      id: 5,
      courseName: '力量训练',
      date: '2024-01-12 20:00',
      status: 'attended'
    }
  ].slice(0, limit);
};

/**
 * Mock用户登录
 * @param {string} code - 微信登录code
 * @returns {Promise<Object>} 用户信息
 */
export const mockLogin = async (code) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockUser;
};

/**
 * Mock获取课程列表
 * @param {string} date - 日期 (YYYY-MM-DD)
 * @returns {Promise<Array>} 课程列表
 */
export const mockGetCourses = async (date) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockCourses(date);
};

/**
 * Mock预约课程
 * @param {number} courseId - 课程ID
 * @param {number} userId - 用户ID
 * @returns {Promise<boolean>} 是否预约成功
 */
export const mockBookCourse = async (courseId, userId) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

/**
 * Mock获取用户统计数据
 * @param {number} userId - 用户ID
 * @param {string} month - 月份 (YYYY-MM)
 * @returns {Promise<Object>} 统计数据
 */
export const mockGetUserStatistics = async (userId, month) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 400));
  return generateMockStatistics(userId, month);
};

/**
 * Mock获取用户近期活动
 * @param {number} userId - 用户ID
 * @param {number} limit - 限制数量
 * @returns {Promise<Array>} 活动列表
 */
export const mockGetUserActivities = async (userId, limit) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockActivities(userId, limit);
};

/**
 * Mock获取会员信息
 * @param {number} userId - 用户ID
 * @returns {Promise<Object>} 会员信息
 */
export const mockGetMembershipInfo = async (userId) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockMembershipInfo;
};

/**
 * 导出mockDataService实例
 */
export const mockDataService = {
  login: mockLogin,
  getCourses: mockGetCourses,
  bookCourse: mockBookCourse,
  getUserStatistics: mockGetUserStatistics,
  getUserActivities: mockGetUserActivities,
  getMembershipInfo: mockGetMembershipInfo
};