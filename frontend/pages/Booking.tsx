import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/apiService';
import { Course, User } from '../types';
import { ChevronRight, MapPin, Clock } from 'lucide-react';

interface BookingProps {
  user: User;
  onOpenCourseDetail: (course: Course) => void;
}

export const Booking: React.FC<BookingProps> = ({ user, onOpenCourseDetail }) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [myBookings, setMyBookings] = useState<Set<string>>(new Set()); // Store booked Course IDs
  
  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      full: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('zh-CN', { weekday: 'short' }), // Chinese: 周一, 周二
      date: d.getDate()
    };
  });

  useEffect(() => {
    // Load courses for selected date
    ApiService.getCourses(selectedDate).then(setCourses);
  }, [selectedDate]);

  const checkConflict = (targetCourse: Course): boolean => {
    // Simple conflict logic: Check if any booked course overlaps with target course
    const bookedCourses = courses.filter(c => myBookings.has(c.id));
    
    for (const booked of bookedCourses) {
      if (booked.id === targetCourse.id) continue;
      
      // Convert HH:mm to minutes for comparison
      const toMin = (t: string) => parseInt(t.split(':')[0]) * 60 + parseInt(t.split(':')[1]);
      
      const targetStart = toMin(targetCourse.timeStart);
      const targetEnd = toMin(targetCourse.timeEnd);
      const bookedStart = toMin(booked.timeStart);
      const bookedEnd = toMin(booked.timeEnd);

      // Overlap formula: (StartA < EndB) and (EndA > StartB)
      if (targetStart < bookedEnd && targetEnd > bookedStart) {
        return true;
      }
    }
    return false;
  };

  const handleBook = async (course: Course) => {
    if (myBookings.has(course.id)) return;
    
    if (checkConflict(course)) {
      alert("⚠️ 预约冲突！您在此时段已有课程。");
      return;
    }

    const success = await ApiService.bookCourse(course.id, user.id);
    if (success) {
      setMyBookings(prev => new Set(prev).add(course.id));
      alert(`✅ ${course.name} 预约成功！`);
    } else {
      alert("预约失败，请稍后重试。");
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-[#32CD32] p-4 pb-8 rounded-b-[2rem] shadow-sm relative z-10">
        <h2 className="text-white text-xl font-bold mb-4">课程预约</h2>
        
        {/* Calendar Strip */}
        <div className="flex overflow-x-auto no-scrollbar space-x-3 pb-2">
          {dates.map((item) => {
            const isSelected = selectedDate === item.full;
            return (
              <button
                key={item.full}
                onClick={() => setSelectedDate(item.full)}
                className={`flex-shrink-0 w-14 h-16 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isSelected 
                    ? 'bg-white text-[#32CD32] shadow-lg transform scale-105' 
                    : 'bg-[#ffffff33] text-white'
                }`}
              >
                <span className="text-xs opacity-80">{item.day}</span>
                <span className="text-lg font-bold">{item.date}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Course List */}
      <div className="p-4 space-y-4 -mt-4 relative z-20">
        {courses.map(course => {
          const isBooked = myBookings.has(course.id);
          const isFull = course.booked >= course.capacity;
          
          return (
            <div key={course.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center">
              {/* Time Column */}
              <div className="flex flex-col items-center mr-4 w-16">
                <span className="text-lg font-bold text-gray-800">{course.timeStart}</span>
                <div className="h-6 w-[1px] bg-gray-200 my-1"></div>
                <span className="text-xs text-gray-400">{course.timeEnd}</span>
              </div>

              {/* Info */}
              <div className="flex-1" onClick={() => onOpenCourseDetail(course)}>
                <div className="flex justify-between items-start cursor-pointer">
                  <h3 className="font-bold text-gray-800 flex items-center">
                    {course.name}
                    <ChevronRight size={16} className="ml-1 text-gray-400" />
                  </h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${course.color}`}>
                    {course.booked}/{course.capacity}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-xs text-gray-500 space-x-3">
                   <div className="flex items-center">
                     <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mr-1">👤</span>
                     {course.coach}
                   </div>
                   <div className="flex items-center">
                      <Clock size={12} className="mr-1"/> 60分钟
                   </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={isBooked || isFull}
                onClick={() => handleBook(course)}
                className={`ml-3 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all active:scale-95 ${
                  isBooked 
                    ? 'bg-gray-100 text-gray-400 cursor-default'
                    : isFull 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#FF6347] text-white hover:bg-[#e55a40]'
                }`}
              >
                {isBooked ? '已约' : isFull ? '满员' : '预约'}
              </button>
            </div>
          );
        })}
        
        {courses.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            今日暂无排课。
          </div>
        )}
      </div>
    </div>
  );
};