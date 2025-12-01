import React from 'react';
import { Home, Calendar, Activity, User as UserIcon } from 'lucide-react';
import { TabKey } from '../types';
import { COLORS } from '../constants';

interface TabBarProps {
  activeTab: TabKey;
  onTabChange: (key: TabKey) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const getIconColor = (key: TabKey) => activeTab === key ? COLORS.primary : '#969799';
  const getTextColor = (key: TabKey) => activeTab === key ? 'text-[#32CD32]' : 'text-gray-400';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center h-16 pb-safe safe-area-inset-bottom z-50">
      <button 
        onClick={() => onTabChange('home')}
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <Home size={24} color={getIconColor('home')} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
        <span className={`text-xs mt-1 ${getTextColor('home')}`}>首页</span>
      </button>
      
      <button 
        onClick={() => onTabChange('booking')}
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <Calendar size={24} color={getIconColor('booking')} strokeWidth={activeTab === 'booking' ? 2.5 : 2} />
        <span className={`text-xs mt-1 ${getTextColor('booking')}`}>课程</span>
      </button>

      <button 
        onClick={() => onTabChange('statistics')}
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <Activity size={24} color={getIconColor('statistics')} strokeWidth={activeTab === 'statistics' ? 2.5 : 2} />
        <span className={`text-xs mt-1 ${getTextColor('statistics')}`}>数据</span>
      </button>

      <button 
        onClick={() => onTabChange('profile')}
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <UserIcon size={24} color={getIconColor('profile')} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
        <span className={`text-xs mt-1 ${getTextColor('profile')}`}>我的</span>
      </button>
    </div>
  );
};