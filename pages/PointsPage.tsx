import React, { useState } from 'react';
import { Award, TrendingUp, ShoppingBag, ChevronRight, ArrowLeft, Gift, Info, Clock } from 'lucide-react';
import { User } from '../types';

interface PointsPageProps {
  user: User;
}

// 积分记录类型
interface PointRecord {
  id: string;
  type: 'earn' | 'spend';
  points: number;
  reason: string;
  date: string;
}

// 积分商品类型
interface PointProduct {
  id: string;
  name: string;
  points: number;
  image: string;
  stock: number;
  description: string;
}

export const PointsPage: React.FC<PointsPageProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'exchange'>('overview');
  const [selectedProduct, setSelectedProduct] = useState<PointProduct | null>(null);
  const [showExchangeModal, setShowExchangeModal] = useState(false);

  // 模拟积分记录数据
  const pointRecords: PointRecord[] = [
    { id: '1', type: 'earn', points: 50, reason: '课程打卡', date: '2025-11-28' },
    { id: '2', type: 'spend', points: -100, reason: '兑换运动毛巾', date: '2025-11-25' },
    { id: '3', type: 'earn', points: 100, reason: '连续锻炼7天', date: '2025-11-20' },
    { id: '4', type: 'earn', points: 30, reason: '分享课程', date: '2025-11-15' },
    { id: '5', type: 'earn', points: 50, reason: '邀请好友', date: '2025-11-10' },
  ];

  // 模拟积分商品数据
  const pointProducts: PointProduct[] = [
    {
      id: '1',
      name: '运动毛巾',
      points: 100,
      image: 'https://via.placeholder.com/100',
      stock: 25,
      description: '专业运动速干毛巾，适合健身使用'
    },
    {
      id: '2', 
      name: '私教体验课',
      points: 300,
      image: 'https://via.placeholder.com/100',
      stock: 10,
      description: '30分钟私教体验课，由资深教练指导'
    },
    {
      id: '3',
      name: '运动水壶',
      points: 150,
      image: 'https://via.placeholder.com/100',
      stock: 20,
      description: '500ml运动水壶，带刻度提醒补水'
    },
    {
      id: '4',
      name: '健身包',
      points: 250,
      image: 'https://via.placeholder.com/100',
      stock: 15,
      description: '大容量健身包，防水材质'
    },
  ];

  // 处理兑换
  const handleExchange = (product: PointProduct) => {
    if (user.points >= product.points && product.stock > 0) {
      setSelectedProduct(product);
      setShowExchangeModal(true);
    }
  };

  // 确认兑换
  const confirmExchange = () => {
    // 这里应该调用API进行兑换
    alert(`成功兑换 ${selectedProduct?.name}！`);
    setShowExchangeModal(false);
    setSelectedProduct(null);
  };

  // 渲染概览标签页
  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* 积分展示卡片 */}
      <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-2">
            <Award className="text-yellow-300" size={24} />
            <span className="font-bold text-lg">我的积分</span>
          </div>
          <span className="text-white text-sm bg-black bg-opacity-20 px-3 py-1 rounded-full">
            本月已获得: +180
          </span>
        </div>
        <div className="flex items-baseline">
          <span className="text-4xl font-bold mr-2">{user.points}</span>
          <span className="text-sm opacity-80">积分</span>
        </div>
        <div className="mt-6">
          <p className="text-sm opacity-80 mb-1">积分有效期至: 2026-12-31</p>
          <div className="w-full bg-white bg-opacity-20 h-2 rounded-full">
            <div className="bg-white h-full rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>

      {/* 积分规则 */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className="font-medium text-[#333] mb-4 flex items-center">
          <Info size={18} className="text-blue-500 mr-2" />
          积分规则
        </h3>
        <div className="space-y-3">
          <RuleItem action="参加团操课程" points={10} />
          <RuleItem action="完成私教课程" points={20} />
          <RuleItem action="连续锻炼7天" points={100} />
          <RuleItem action="分享课程到朋友圈" points={30} />
          <RuleItem action="邀请新会员注册" points={50} />
        </div>
      </div>

      {/* 积分任务 */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className="font-medium text-[#333] mb-4 flex items-center">
          <TrendingUp size={18} className="text-green-500 mr-2" />
          积分任务
        </h3>
        <div className="space-y-3">
          <TaskItem task="完善个人信息" points={20} completed={true} />
          <TaskItem task="首次预约私教课" points={50} completed={false} />
          <TaskItem task="参加3次团操课" points={30} completed={false} progress={1} total={3} />
        </div>
      </div>
    </div>
  );

  // 渲染积分记录标签页
  const renderHistoryTab = () => (
    <div className="space-y-3">
      {pointRecords.map(record => (
        <div key={record.id} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-[#333]">{record.reason}</span>
            <span className={record.type === 'earn' ? 'text-green-600' : 'text-red-600'}>
              {record.type === 'earn' ? '+' : ''}{record.points}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{record.date}</span>
            <span className="text-xs text-gray-400">
              {record.type === 'earn' ? '获得积分' : '兑换使用'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  // 渲染积分兑换标签页
  const renderExchangeTab = () => (
    <div className="space-y-4">
      {pointProducts.map(product => (
        <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-20 h-20 rounded-lg object-cover mr-4"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-[#333]">{product.name}</h3>
              <span className="text-red-600 font-medium">{product.points}积分</span>
            </div>
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">库存: {product.stock}</span>
              <button 
                onClick={() => handleExchange(product)}
                disabled={user.points < product.points || product.stock <= 0}
                className={`text-sm px-4 py-1.5 rounded-full ${user.points >= product.points && product.stock > 0 ? 
                  'bg-green-500 text-white hover:bg-green-600' : 
                  'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              >
                {product.stock <= 0 ? '库存不足' : 
                 user.points < product.points ? '积分不足' : '立即兑换'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b border-gray-100">
        <div className="flex items-center h-12 px-4">
          <button className="p-2 -ml-2">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-medium ml-1">积分中心</h1>
        </div>
        
        {/* 标签页导航 */}
        <div className="flex border-b border-gray-100">
          <TabButton 
            title="积分概览" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          />
          <TabButton 
            title="积分记录" 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')}
          />
          <TabButton 
            title="积分兑换" 
            active={activeTab === 'exchange'} 
            onClick={() => setActiveTab('exchange')}
          />
        </div>
      </div>

      {/* 主内容区 */}
      <div className="pt-28 px-4">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'history' && renderHistoryTab()}
        {activeTab === 'exchange' && renderExchangeTab()}
      </div>

      {/* 兑换确认弹窗 */}
      {showExchangeModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-xl p-5 w-[90%] max-w-sm">
            <h3 className="font-bold text-lg text-center mb-4">确认兑换</h3>
            <div className="flex items-center mb-4">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-20 h-20 rounded-lg object-cover mr-4"
              />
              <div>
                <p className="font-medium text-[#333]">{selectedProduct.name}</p>
                <p className="text-red-600 font-medium">{selectedProduct.points}积分</p>
              </div>
            </div>
            <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600 flex items-start">
                <Info size={16} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>兑换成功后，工作人员将与您联系安排领取或配送。</span>
              </p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowExchangeModal(false)}
                className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-600"
              >
                取消
              </button>
              <button 
                onClick={confirmExchange}
                className="flex-1 py-2.5 bg-green-500 text-white rounded-lg"
              >
                确认兑换
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 积分规则项组件
const RuleItem: React.FC<{ action: string; points: number }> = ({ action, points }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-600">{action}</span>
    <span className="text-green-600">+{points} 积分</span>
  </div>
);

// 积分任务项组件
const TaskItem: React.FC<{
  task: string;
  points: number;
  completed: boolean;
  progress?: number;
  total?: number;
}> = ({ task, points, completed, progress, total }) => (
  <div className="flex justify-between items-center">
    <div className="flex-1">
      <div className="flex items-center mb-1">
        <span className={`mr-2 ${completed ? 'text-green-600' : 'text-gray-300'}`}>
          {completed ? '✓' : '○'}
        </span>
        <span className="text-sm text-gray-600">{task}</span>
      </div>
      {progress !== undefined && total !== undefined && (
        <div className="flex items-center">
          <div className="w-full bg-gray-100 h-1.5 rounded-full mr-2">
            <div 
              className="bg-green-500 h-full rounded-full" 
              style={{ width: `${(progress / total) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-400">{progress}/{total}</span>
        </div>
      )}
    </div>
    <span className="text-green-600 font-medium">+{points} 积分</span>
  </div>
);

// 标签按钮组件
const TabButton: React.FC<{
  title: string;
  active: boolean;
  onClick: () => void;
}> = ({ title, active, onClick }) => (
  <button
    className={`flex-1 py-3 text-sm ${active ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
    onClick={onClick}
  >
    {title}
  </button>
);
