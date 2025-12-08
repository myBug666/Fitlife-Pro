import React, { useState, useEffect, useCallback } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Course } from '../types';
import { getMockCourses } from '../services/mockDataService';
import PerformanceUtils from '../utils/PerformanceUtils';

interface HomeProps {
  onNavigateToCourseDetail?: (course: Course) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigateToCourseDetail }) => {
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [popularCourses, setPopularCourses] = useState<Array<{course: Course, rating: number}>>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filterTags = ['减脂', '增肌', '康复', '新手', '瑜伽', '高强度'];

  useEffect(() => {
    // 初始化缓存
    PerformanceUtils.loadCache();
    
    // 获取模拟数据
    const fetchData = async () => {
      const today = new Date().toISOString().split('T')[0];
      
      // 尝试从缓存获取推荐课程
      const recommendedCacheKey = `recommended_courses_${today}`;
      const cachedRecommended = PerformanceUtils.getCache(recommendedCacheKey);
      
      if (cachedRecommended) {
        setRecommendedCourses(cachedRecommended);
      } else {
        const courses = getMockCourses();
        const todayCourses = courses.filter(c => c.date === today);
        setRecommendedCourses(todayCourses);
        // 缓存推荐课程，有效期1小时
        PerformanceUtils.setCache(recommendedCacheKey, todayCourses, 3600000);
      }
      
      // 尝试从缓存获取热门课程
      const popularCacheKey = 'popular_courses';
      const cachedPopular = PerformanceUtils.getCache(popularCacheKey);
      
      if (cachedPopular) {
        setPopularCourses(cachedPopular);
      } else {
        const courses = getMockCourses();
        const popularWithRatings = courses.slice(0, 5).map((course, index) => ({
          course,
          rating: 4.9 - index * 0.1
        }));
        setPopularCourses(popularWithRatings);
        // 缓存热门课程，有效期2小时
        PerformanceUtils.setCache(popularCacheKey, popularWithRatings, 7200000);
      }
    };
    
    fetchData();
  }, []);
  
  // 使用防抖优化搜索
  const debouncedSearch = useCallback(
    PerformanceUtils.debounce((query: string) => {
      console.log('搜索课程:', query);
      // 在实际应用中这里会调用API搜索
    }, 500),
    []);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleTagToggle = useCallback((tag: string) => {
    // 使用缓存键
    const cacheKey = `selected_tags_${Date.now()}`;
    
    setSelectedTags(prev => {
      const newTags = prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
      
      // 缓存选中的标签，用于后续恢复状态
      PerformanceUtils.setCache(cacheKey, newTags, 3600000);
      return newTags;
    });
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => 
      prev === 0 ? recommendedCourses.length - 2 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => 
      prev >= recommendedCourses.length - 2 ? 0 : prev + 1
    );
  };

  const handleCourseClick = (course: Course) => {
    if (onNavigateToCourseDetail) {
      onNavigateToCourseDetail(course);
    } else {
      console.log('Navigate to course detail:', course.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 搜索栏 */}
      <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-100">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <Search size={18} color="#999" className="mr-2" />
          <input
            type="text"
            placeholder="搜索课程或教练"
            className="bg-transparent border-none outline-none w-full text-[#333] text-base"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="px-4">
        {/* 今日推荐课程 */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[#333]">今日推荐课程</h2>
            <div className="flex space-x-2">
              <button onClick={handlePrevSlide} className="p-2 rounded-full hover:bg-gray-100">
                <ChevronLeft size={20} color="#333" />
              </button>
              <button onClick={handleNextSlide} className="p-2 rounded-full hover:bg-gray-100">
                <ChevronRight size={20} color="#333" />
              </button>
            </div>
          </div>
          
          {recommendedCourses.length > 0 ? (
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out gap-4"
                style={{ transform: `translateX(-${currentSlide * (100/2)}%)` }}
              >
                {recommendedCourses.map((course) => (
                  <div 
                key={course.id} 
                className="min-w-[calc(50%-8px)] bg-white rounded-lg p-4 shadow-sm border border-gray-100 cursor-pointer"
                onClick={() => handleCourseClick(course)}
              >
                    <div className="h-24 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                      <span className="text-gray-500">{course.name}</span>
                    </div>
                    <h3 className="font-medium text-[#333] mb-1">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.timeStart}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">今日暂无推荐课程</div>
          )}
        </div>

        {/* 热门课程榜单 */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-[#333] mb-4">热门课程榜单</h2>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            {popularCourses.map((item, index) => (
              <div 
                key={item.course.id} 
                className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                onClick={() => handleCourseClick(item.course)}
              >
                <div className="flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-sm font-bold mr-3">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-medium text-[#333]">{item.course.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400 text-xs mr-1">★</span>
                      <span className="text-sm text-gray-500">{item.rating}分</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">{item.course.timeStart}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 标签筛选 */}
        <div className="mt-8 mb-10">
          <h2 className="text-lg font-bold text-[#333] mb-4">标签筛选</h2>
          <div className="flex flex-wrap gap-3">
            {filterTags.map(tag => (
              <button
                key={tag}
                className={`px-4 py-2 rounded-full text-sm transition-all ${selectedTags.includes(tag) 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
