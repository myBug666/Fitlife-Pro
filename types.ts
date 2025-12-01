export enum CardType {
  ANNUAL = "尊享年卡",
  QUARTERLY = "超值季卡",
  MONTHLY = "体验月卡"
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  cardType: CardType;
  balance: number;
  points: number;
  expireDate: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  time: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  location: string;
  capacity: number;
  enrolled: number;
  price?: number;
  intensity?: 'low' | 'medium' | 'high';
  description?: string;
  imageUrl?: string;
  rating?: number;
  tags?: string[];
  instructorAvatar?: string;
  instructorCert?: string;
  enrolledUsers?: string[];
  status?: 'upcoming' | 'ongoing' | 'completed';
}

export interface BodyMetric {
  testId: string;
  memberId: string;
  testDate: string;
  weight: number;
  bodyFatRate: number;
  muscleMass: number;
  bmi: number;
  waistline: number;
  hip: number;
  coachSuggestion: string;
  // 保持兼容性字段
  date?: string;
  bodyFat?: number;
}

export type TabKey = 'home' | 'booking' | 'statistics' | 'profile';