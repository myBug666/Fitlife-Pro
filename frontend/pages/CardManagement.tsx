import React, { useState } from 'react';
import { CreditCard, Clock, Calendar, ChevronRight, Info } from 'lucide-react';
import { User } from '../types';

interface CardManagementProps {
  user: User;
}

export const CardManagement: React.FC<CardManagementProps> = ({ user }) => {
  const [showDetail, setShowDetail] = useState(false);

  // 计算剩余天数
  const calculateRemainingDays = (expireDateString: string) => {
    const expireDate = new Date(expireDateString);
    const today = new Date();
    const diffTime = expireDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const remainingDays = calculateRemainingDays(user.expireDate);
  const membershipCardNumber = `MC${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

  return (
    <div className="pb-20">
      {/* 会员卡展示 */}
      <div className="px-4 pt-6 pb-8">
        <div className="relative">
          {/* 会员卡背景 */}
          <div className="bg-gradient-to-r from-[#32CD32] to-[#228B22] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            {/* 装饰元素 */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>
            
            {/* 卡片顶部信息 */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center space-x-2">
                <CreditCard className="text-yellow-300" size={24} />
                <span className="font-bold text-lg tracking-wide">{user.cardType}</span>
              </div>
              <span className="bg-black bg-opacity-20 px-3 py-1 rounded-full text-sm">使用中</span>
            </div>

            {/* 会员信息 */}
            <div className="mb-6">
              <p className="text-sm opacity-80 mb-1">持卡人</p>
              <p className="text-xl font-bold">{user.name}</p>
            </div>

            {/* 卡号信息 */}
            <div className="mb-6">
              <p className="text-sm opacity-80 mb-1">会员卡号</p>
              <p className="text-lg">{membershipCardNumber}</p>
            </div>

            {/* 底部信息 */}
            <div className="flex justify-between items-end">
              <div>
                <div className="flex items-center">
                  <Calendar size={16} className="opacity-80 mr-2" />
                  <p className="text-sm opacity-80">有效期至: {user.expireDate}</p>
                </div>
                <p className="text-sm mt-1">
                  <Clock size={16} className="inline-block mr-1 opacity-80" />
                  剩余 <span className="font-bold">{remainingDays}</span> 天
                </p>
              </div>
              <button 
                onClick={() => setShowDetail(!showDetail)}
                className="bg-white text-green-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                {showDetail ? '隐藏详情' : '查看详情'}
              </button>
            </div>
          </div>

          {/* 卡片细节（可展开） */}
          {showDetail && (
            <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-medium text-[#333] mb-3">会员权益</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Info size={18} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm text-gray-600">免费参加所有团操课程</span>
                </li>
                <li className="flex items-start">
                  <Info size={18} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm text-gray-600">享受私教课程8折优惠</span>
                </li>
                <li className="flex items-start">
                  <Info size={18} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm text-gray-600">每月可带一位朋友免费体验一次</span>
                </li>
                <li className="flex items-start">
                  <Info size={18} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm text-gray-600">专属储物柜使用权</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 续费选项 */}
      <div className="px-4">
        <h2 className="text-lg font-bold text-[#333] mb-4">会员续费</h2>
        <div className="space-y-3">
          <SubscriptionOption 
            title="年卡续费" 
            price={2980} 
            period="12个月" 
            discount="8.5折优惠" 
            isRecommended={true}
          />
          <SubscriptionOption 
            title="季卡续费" 
            price={980} 
            period="3个月" 
            discount="无优惠" 
          />
          <SubscriptionOption 
            title="月卡续费" 
            price={428} 
            period="1个月" 
            discount="无优惠" 
          />
        </div>
      </div>

      {/* 底部操作按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100">
        <button className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
          立即续费
        </button>
      </div>
    </div>
  );
};

// 续费选项组件
interface SubscriptionOptionProps {
  title: string;
  price: number;
  period: string;
  discount: string;
  isRecommended?: boolean;
}

const SubscriptionOption: React.FC<SubscriptionOptionProps> = ({ 
  title, 
  price, 
  period, 
  discount, 
  isRecommended = false 
}) => {
  return (
    <div className={`border rounded-xl p-4 relative ${isRecommended ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
      {isRecommended && (
        <div className="absolute -top-3 left-4 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
          推荐
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h3 className={`font-medium ${isRecommended ? 'text-green-600' : 'text-[#333]'}`}>{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{period}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-[#333]">¥{price}</p>
          <p className="text-xs text-red-500 mt-1">{discount}</p>
        </div>
      </div>
    </div>
  );
};
