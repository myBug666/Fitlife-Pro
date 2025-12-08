import React from 'react';
import { User } from '../types';
import { Calendar, FileText, CreditCard, Award, ChevronRight, Settings, ShoppingCart, Star, BarChart } from 'lucide-react';

interface ProfileProps {
    user: User;
    onBack: () => void;
    onOpenCardManagement: () => void;
    onOpenPersonalInfo: () => void;
    onOpenPointsPage: () => void;
    onOpenBodyMetrics: () => void;
    onOpenSettings: () => void;
  }

export const Profile: React.FC<ProfileProps> = ({ user, onBack, onOpenCardManagement, onOpenPersonalInfo, onOpenPointsPage, onOpenBodyMetrics, onOpenSettings }) => {
  // 生成会员卡号码（格式：MC + 年月日 + 4位随机数）
  const membershipCardNumber = `MC${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
  
  // 计算剩余天数
  const calculateRemainingDays = (expireDateString: string) => {
    const expireDate = new Date(expireDateString);
    const today = new Date();
    const diffTime = expireDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };
  
  const remainingDays = calculateRemainingDays(user.expireDate);

  return (
    <div className="pb-20">
      {/* Header Info */}
      <div className="bg-white p-6 pt-10 flex flex-col">
        <div className="flex items-center space-x-4 mb-4">
          <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-gray-100" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#333]">{user.name}</h2>
            <p className="text-sm text-gray-500">会员卡号：{membershipCardNumber}</p>
          </div>
          <Settings size={20} className="text-gray-400" />
        </div>
        <div className="flex items-center bg-green-50 text-green-600 px-3 py-2 rounded-lg">
          <span className="text-sm font-medium">{user.cardType}</span>
          <span className="mx-2 text-xs text-gray-400">|</span>
          <span className="text-sm">剩余{remainingDays}天</span>
        </div>
      </div>

      {/* 余额和积分信息 */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500 mb-1">💰 余额</span>
          <span className="text-xl font-bold text-[#333]">¥{user.balance.toFixed(2)}</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500 mb-1">🏅 积分</span>
          <span className="text-xl font-bold text-[#333]">{user.points}</span>
        </div>
      </div>

      {/* 功能菜单 */}
      <div className="mt-6 px-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <MenuCell icon={<ShoppingCart size={20} className="text-red-500" />} title="我的订单" />
          <MenuCell icon={<Calendar size={20} className="text-green-500" />} title="我的预约" />
          <MenuCell icon={<FileText size={20} className="text-blue-500" />} title="体测报告" onPress={onOpenBodyMetrics} />
          <MenuCell icon={<CreditCard size={20} className="text-orange-500" />} title="会员卡管理" onPress={onOpenCardManagement} />
          <MenuCell icon={<Star size={20} className="text-yellow-500" />} title="积分商城" onPress={onOpenPointsPage} />
          <MenuCell icon={<Settings size={20} className="text-gray-500" />} title="设置" onPress={onOpenSettings} />
        </div>
      </div>
    </div>
  );
};

const MenuCell: React.FC<{icon: React.ReactNode, title: string, onPress?: () => void}> = ({ icon, title, onPress }) => (
  <button className="w-full bg-white p-4 rounded-xl flex items-center justify-between shadow-sm active:bg-gray-50" onClick={onPress}>
    <div className="flex items-center space-x-3">
      {icon}
      <span className="text-gray-700 font-medium">{title}</span>
    </div>
    <ChevronRight size={18} className="text-gray-300" />
  </button>
);