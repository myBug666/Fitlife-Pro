import React, { useState } from 'react';
import { Course } from '../types';
import { ArrowLeft, Share2, Bookmark, BookmarkCheck, Clock, MapPin, Star, Heart, Users, ChevronRight } from 'lucide-react';

interface CourseDetailProps {
  course: Course;
  onBook: (course: Course) => void;
  onBack: () => void;
}

// 课程详情页组件
export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBook, onBack }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // 处理收藏切换
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // 处理分享
  const handleShare = () => {
    // 这里应该调用微信分享API
    alert('分享功能开发中...');
  };

  // 计算剩余座位数
  const remainingSeats = course.capacity - course.booked;

  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  // 格式化时间范围
  const formatTimeRange = (start: string, end: string) => {
    return `${start}-${end}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b border-gray-100">
        <div className="flex items-center justify-between h-12 px-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft size={20} />
          </button>
          <div className="flex space-x-4">
            <button onClick={handleShare} className="p-2">
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button onClick={toggleFavorite} className="p-2">
              {isFavorite ? 
                <BookmarkCheck size={20} className="text-red-500" /> : 
                <Bookmark size={20} className="text-gray-600" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="pt-12">
        {/* 课程封面图 */}
        <div className="w-full h-48 bg-gray-200 relative">
          <img 
            src={course.imageUrl || 'https://via.placeholder.com/400x200'} 
            alt={course.name} 
            className="w-full h-full object-cover"
          />
          {/* 课程标签 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
        </div>

        {/* 课程基本信息 */}
        <div className="bg-white px-4 py-5">
          <h1 className="text-2xl font-bold text-[#333] mb-2">{course.name}</h1>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm ml-1">{course.rating || 4.9}</span>
            </div>
            <div className="flex items-center">
              <Heart size={16} className="text-red-500" />
              <span className="text-sm ml-1">{course.likes || 128}人喜欢</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${course.color}`}>
              {course.type || '团操课'}
            </span>
          </div>

          {/* 课程时间地点信息 */}
          <div className="space-y-3">
            <InfoRow icon={<Clock size={18} />} label="课程时间" value={formatDate(course.date)} />
            <InfoRow icon={<Clock size={18} />} label="时段" value={formatTimeRange(course.timeStart, course.timeEnd)} />
            <InfoRow icon={<MapPin size={18} />} label="上课地点" value={course.location || '操房A'} />
            <InfoRow icon={<Users size={18} />} label="剩余名额" value={`${remainingSeats}/${course.capacity}`} />
          </div>
        </div>

        {/* 课程介绍 */}
        <div className="bg-white mt-3 px-4 py-5">
          <h2 className="text-lg font-bold text-[#333] mb-3">课程介绍</h2>
          <p className="text-gray-600 leading-relaxed">
            {course.description || 
              '这是一门专业的健身课程，适合各个健身水平的学员参加。课程由资深教练精心设计，结合了多种训练方法，帮助您有效地提高身体素质、塑造完美体型。通过系统的训练，您将增强心肺功能、提高肌肉力量和耐力，同时还能改善柔韧性和协调性。'}
          </p>
        </div>

        {/* 教练信息 */}
        <div className="bg-white mt-3 px-4 py-5">
          <h2 className="text-lg font-bold text-[#333] mb-3">教练信息</h2>
          <div className="flex items-center">
            <img 
              src={course.coachAvatar || 'https://via.placeholder.com/80'} 
              alt={course.coach} 
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#333]">{course.coach}</h3>
                <button className="text-sm text-green-600 flex items-center">
                  查看详情
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">{course.coachCertification || 'ACE美国运动协会认证'}</p>
              <div className="flex items-center mt-2">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs ml-1">{course.coachRating || 4.8}分</span>
                <span className="text-xs text-gray-400 ml-2">教授课程 {course.coachClasses || 128} 节</span>
              </div>
            </div>
          </div>
        </div>

        {/* 课程亮点 */}
        <div className="bg-white mt-3 px-4 py-5">
          <h2 className="text-lg font-bold text-[#333] mb-3">课程亮点</h2>
          <div className="grid grid-cols-2 gap-3">
            <HighlightItem title="专业指导" description="由经验丰富的教练全程指导" />
            <HighlightItem title="科学训练" description="结合现代健身理念，科学有效" />
            <HighlightItem title="适合人群" description="适合各级健身爱好者" />
            <HighlightItem title="设备使用" description="提供专业健身器材" />
          </div>
        </div>

        {/* 用户评价 */}
        <div className="bg-white mt-3 px-4 py-5 mb-24">
          <h2 className="text-lg font-bold text-[#333] mb-3">用户评价 ({course.reviewCount || 36})</h2>
          <div className="space-y-4">
            <ReviewItem 
              name="张先生" 
              avatar="https://via.placeholder.com/40"
              rating={5}
              date="2025-11-25"
              content="教练很专业，课程设计合理，上完感觉很有效果！推荐给大家。"
            />
            <ReviewItem 
              name="李女士" 
              avatar="https://via.placeholder.com/40"
              rating={4}
              date="2025-11-20"
              content="第一次参加这种课程，感觉很有趣，教练很有耐心。"
            />
            <button className="w-full py-2 text-center text-green-600 text-sm">
              查看更多评价
            </button>
          </div>
        </div>
      </div>

      {/* 底部预约按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-sm">课程价格</span>
            <p className="text-2xl font-bold text-red-600">¥{course.price || 39}</p>
          </div>
          <button 
            onClick={() => onBook(course)}
            className={`px-8 py-3 rounded-full font-medium text-white ${remainingSeats > 0 ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={remainingSeats <= 0}
          >
            {remainingSeats > 0 ? '立即预约' : '已约满'}
          </button>
        </div>
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
    <span className="text-sm text-gray-500 w-16">{label}</span>
    <span className="text-sm text-[#333] flex-1">{value}</span>
  </div>
);

// 亮点项组件
interface HighlightItemProps {
  title: string;
  description: string;
}

const HighlightItem: React.FC<HighlightItemProps> = ({ title, description }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <h4 className="font-medium text-sm text-[#333] mb-1">{title}</h4>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);

// 评价项组件
interface ReviewItemProps {
  name: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ name, avatar, rating, date, content }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={14} 
          className={`${i <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img src={avatar} alt={name} className="w-8 h-8 rounded-full mr-2" />
          <span className="text-sm font-medium">{name}</span>
        </div>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
      <div className="flex items-center mb-2">
        {renderStars()}
      </div>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  );
};
