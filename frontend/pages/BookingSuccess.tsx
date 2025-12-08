import React, { useEffect } from 'react';
import { Course } from '../types';
import { CheckCircle, Calendar, Clock, MapPin, Star, Bell, Share2, ChevronRight } from 'lucide-react';

interface BookingSuccessProps {
  course: Course;
  onBackToHome: () => void;
  onViewBooking: () => void;
}

export const BookingSuccess: React.FC<BookingSuccessProps> = ({ 
  course, 
  onBackToHome, 
  onViewBooking 
}) => {
  useEffect(() => {
    // 在实际应用中，这里可以调用订阅消息的API
    // 模拟订阅操作
    setTimeout(() => {
      alert('已为您订阅课程提醒，开课前2小时将收到通知');
    }, 1000);
  }, []);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* 成功提示 */}
      <div className="mt-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-[#333] mb-2">预约成功！</h1>
        <p className="text-gray-500 mb-8">
          您已成功预约{course.name}，请按时参加
        </p>
      </div>

      {/* 课程信息卡片 */}
      <div className="bg-white rounded-xl w-[90%] px-5 py-5 shadow-sm">
        <div className="flex items-center mb-4">
          <img 
            src={course.imageUrl || 'https://via.placeholder.com/100'} 
            alt={course.name} 
            className="w-16 h-16 rounded-lg object-cover mr-3"
          />
          <div className="flex-1">
            <h2 className="font-bold text-[#333]">{course.name}</h2>
            <div className="flex items-center mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${course.color}`}>
                {course.type || '团操课'}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <InfoRow icon={<Calendar size={18} />} label="课程日期" value={formatDate(course.date)} />
          <InfoRow icon={<Clock size={18} />} label="课程时间" value={`${course.timeStart}-${course.timeEnd}`} />
          <InfoRow icon={<MapPin size={18} />} label="上课地点" value={course.location || '操房A'} />
          <InfoRow icon={<Star size={18} />} label="教练" value={course.coach} />
        </div>

        {/* 二维码区域 */}
        <div className="mt-5 text-center">
          <p className="text-sm text-gray-500 mb-2">课程签到码</p>
          <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
            <span className="text-gray-400 text-xs">签到码图片</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">上课时请出示此码进行签到</p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="mt-8 w-[90%] space-y-3">
        <button 
          onClick={onViewBooking}
          className="w-full py-3 bg-green-500 text-white rounded-lg font-medium flex items-center justify-center"
        >
          查看预约详情
          <ChevronRight size={18} className="ml-1" />
        </button>
        
        <button 
          onClick={onBackToHome}
          className="w-full py-3 border border-gray-300 text-gray-600 rounded-lg font-medium"
        >
          返回首页
        </button>
      </div>

      {/* 温馨提示 */}
      <div className="mt-8 w-[90%] bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-[#333] flex items-center mb-3">
          <Bell size={16} className="text-yellow-500 mr-2" />
          温馨提示
        </h3>
        <ul className="text-xs text-gray-600 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">1.</span>
            <span>请提前10分钟到达场地，做好准备活动</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">2.</span>
            <span>如需取消预约，请提前4小时操作，避免影响您的信用记录</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">3.</span>
            <span>课程结束后可对教练进行评价，您的反馈对我们很重要</span>
          </li>
        </ul>
      </div>

      {/* 分享按钮 */}
      <div className="mt-auto mb-8">
        <button className="flex items-center text-sm text-gray-500">
          <Share2 size={16} className="mr-1" />
          分享课程给好友
        </button>
      </div>
    </div>
  );
};

// 信息行组件
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="w-8 text-gray-400">{icon}</div>
    <span className="text-sm text-gray-500 w-20">{label}</span>
    <span className="text-sm text-[#333] flex-1">{value}</span>
  </div>
);
