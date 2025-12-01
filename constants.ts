import { BodyMetric, Course, User, CardType } from "./types";

// Design Colors - 标准模式
export const COLORS = {
  primary: '#32CD32', // Lime Green
  secondary: '#FF6347', // Tomato
  bg: '#f7f8fa',
  text: '#333333',
  subText: '#969799',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444'
};

// 适老化模式颜色 - 高对比度，更易识别
export const SENIOR_COLORS = {
  primary: '#006400', // 深绿色，提高对比度
  secondary: '#D32F2F', // 深红色，提高对比度
  bg: '#FFFFFF', // 纯白色背景，提高亮度
  text: '#000000', // 纯黑色文字，提高对比度
  subText: '#333333', // 深灰色，替代浅灰色
  border: '#BBBBBB', // 更粗的边框颜色
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626'
};

// 字体大小设置
export const FONTS = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
  xlarge: 20,
  xxlarge: 24
};

// 适老化字体大小设置 - 更大的字体
export const SENIOR_FONTS = {
  small: 14,    // 增大
  regular: 16,  // 增大
  medium: 18,   // 增大
  large: 22,    // 增大
  xlarge: 26,   // 增大
  xxlarge: 32   // 增大
};

// 间距设置
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};

// 适老化间距设置 - 更大的间距
export const SENIOR_SPACING = {
  xs: 8,
  sm: 12,
  md: 20,
  lg: 28,
  xl: 36
};

// 按钮尺寸设置
export const BUTTON_SIZES = {
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    fontSize: 16
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 18
  }
};

// 适老化按钮尺寸设置 - 更大的按钮
export const SENIOR_BUTTON_SIZES = {
  small: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16
  },
  medium: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 18
  },
  large: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    fontSize: 20
  }
};

// Mock User
export const MOCK_USER: User = {
  id: "10001",
  name: "李健 (Alex)",
  avatar: "https://picsum.photos/200/200",
  cardType: CardType.ANNUAL,
  balance: 1200.50,
  points: 3500,
  expireDate: "2024-12-31"
};

// Mock Courses for the next few days
export const MOCK_COURSES: Course[] = [
  {
    id: "c_001",
    name: "HIIT 燃脂特训",
    coach: "迈克教练",
    timeStart: "10:00",
    timeEnd: "11:00",
    date: new Date().toISOString().split('T')[0], // Today
    capacity: 20,
    booked: 15,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "c_002",
    name: "流瑜伽 (Yoga)",
    coach: "Sarah 老师",
    timeStart: "14:00",
    timeEnd: "15:00",
    date: new Date().toISOString().split('T')[0], // Today
    capacity: 15,
    booked: 15, // Full
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: "c_003",
    name: "莱美杠铃操",
    coach: "大卫教练",
    timeStart: "18:00",
    timeEnd: "19:00",
    date: new Date().toISOString().split('T')[0], // Today
    capacity: 25,
    booked: 20,
    color: "bg-orange-100 text-orange-800"
  }
];

// Mock Body Data for Chart
export const MOCK_BODY_DATA: BodyMetric[] = [
  {
    testId: "20240105001",
    memberId: "10001",
    testDate: "2024-01-05",
    weight: 72.5,
    bodyFatRate: 22.8,
    muscleMass: 26.3,
    bmi: 24.5,
    waistline: 86.5,
    hip: 94.2,
    coachSuggestion: "加强有氧运动，控制饮食，降低体脂率",
    date: '01-05',
    bodyFat: 22.8
  },
  {
    testId: "20240210001",
    memberId: "10001",
    testDate: "2024-02-10",
    weight: 71.2,
    bodyFatRate: 21.5,
    muscleMass: 26.8,
    bmi: 24.1,
    waistline: 85.2,
    hip: 93.8,
    coachSuggestion: "体脂率有所下降，继续保持训练强度",
    date: '02-10',
    bodyFat: 21.5
  },
  {
    testId: "20240315001",
    memberId: "10001",
    testDate: "2024-03-15",
    weight: 70.0,
    bodyFatRate: 20.2,
    muscleMass: 27.1,
    bmi: 23.7,
    waistline: 83.5,
    hip: 93.0,
    coachSuggestion: "体重和体脂稳步下降，建议增加力量训练",
    date: '03-15',
    bodyFat: 20.2
  },
  {
    testId: "20240420001",
    memberId: "10001",
    testDate: "2024-04-20",
    weight: 68.8,
    bodyFatRate: 19.0,
    muscleMass: 27.6,
    bmi: 23.2,
    waistline: 81.8,
    hip: 92.5,
    coachSuggestion: "各项指标持续改善，体脂率接近理想范围",
    date: '04-20',
    bodyFat: 19.0
  },
  {
    testId: "20240525001",
    memberId: "10001",
    testDate: "2024-05-25",
    weight: 68.5,
    bodyFatRate: 18.2,
    muscleMass: 28.3,
    bmi: 23.1,
    waistline: 80.5,
    hip: 92.0,
    coachSuggestion: "增加上肢力量训练，继续保持良好状态",
    date: '05-25',
    bodyFat: 18.2
  }
];