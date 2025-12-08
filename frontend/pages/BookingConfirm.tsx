import React, { useState } from 'react';
import { Course, User } from '../types';
import { ArrowLeft, Calendar, Clock, MapPin, Users, AlertTriangle, Check, ChevronRight, Wallet, CreditCard } from 'lucide-react';

interface BookingConfirmProps {
  course: Course;
  user: User;
  onConfirm: (course: Course, paymentMethod: string) => void;
  onCancel: () => void;
}

export const BookingConfirm: React.FC<BookingConfirmProps> = ({ course, user, onConfirm, onCancel }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('balance'); // balance | card
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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

  // 处理提交预约
  const handleSubmit = async () => {
    if (!agreeTerms) {
      alert('请阅读并同意预约条款');
      return;
    }

    setIsProcessing(true);
    try {
      // 模拟处理时间
      await new Promise(resolve => setTimeout(resolve, 1000));
      onConfirm(course, selectedPaymentMethod);
    } catch (error) {
      alert('预约失败，请稍后重试');
    } finally {
      setIsProcessing(false);
    }
  };

  // 检查余额是否充足
  const isBalanceSufficient = user.balance >= (course.price || 39);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b border-gray-100">
        <div className="flex items-center justify-between h-12 px-4">
          <button onClick={onCancel} className="p-2 -ml-2">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-medium">确认预约</h1>
          <div className="w-8"></div> {/* 占位，保持标题居中 */}
        </div>
      </div>

      {/* 主内容区 */}
      <div className="pt-12 pb-24">
        {/* 课程信息卡片 */}
        <div className="bg-white px-4 py-5">
          <h2 className="text-lg font-bold text-[#333] mb-4">课程信息</h2>
          
          <div className="mb-4">
            <div className="flex items-center space-x-3 mb-2">
              <img 
                src={course.imageUrl || 'https://via.placeholder.com/100'} 
                alt={course.name} 
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold text-[#333]">{course.name}</h3>
                <div className="flex items-center mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${course.color}`}>
                    {course.type || '团操课'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <InfoRow icon={<Calendar size={18} />} label="课程日期" value={formatDate(course.date)} />
            <InfoRow icon={<Clock size={18} />} label="课程时间" value={`${course.timeStart}-${course.timeEnd}`} />
            <InfoRow icon={<MapPin size={18} />} label="上课地点" value={course.location || '操房A'} />
            <InfoRow icon={<Users size={18} />} label="教练" value={course.coach} />
            <InfoRow icon={<Wallet size={18} />} label="课程价格" value={`¥${course.price || 39}`} />
          </div>
        </div>

        {/* 支付方式 */}
        <div className="bg-white mt-3 px-4 py-5">
          <h2 className="text-lg font-bold text-[#333] mb-4">支付方式</h2>
          
          <div className="space-y-3">
            <PaymentMethodOption 
              id="balance"
              selected={selectedPaymentMethod === 'balance'}
              onSelect={() => setSelectedPaymentMethod('balance')}
              icon={<Wallet size={20} className="text-green-600" />}
              title="账户余额"
              subtitle={`当前余额: ¥${user.balance.toFixed(2)}`}
              disabled={!isBalanceSufficient}
              errorText={!isBalanceSufficient ? '余额不足' : undefined}
            />
            
            <PaymentMethodOption 
              id="card"
              selected={selectedPaymentMethod === 'card'}
              onSelect={() => setSelectedPaymentMethod('card')}
              icon={<CreditCard size={20} className="text-blue-600" />}
              title="微信支付"
              subtitle="使用微信绑定的银行卡支付"
            />
          </div>
        </div>

        {/* 预约提醒 */}
        <div className="bg-yellow-50 mt-3 px-4 py-4">
          <div className="flex">
            <AlertTriangle size={18} className="text-yellow-500 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">
                1. 预约成功后，系统将在开课前2小时发送提醒通知
              </p>
              <p className="text-sm text-gray-600 mt-1">
                2. 如需取消预约，请提前4小时操作，否则将扣除相应积分
              </p>
            </div>
          </div>
        </div>

        {/* 条款确认 */}
        <div className="px-4 mt-4">
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={agreeTerms} 
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            <span className="text-sm text-gray-600 ml-2">
              我已阅读并同意《预约服务条款》和《隐私政策》
            </span>
          </label>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="text-right">
            <span className="text-gray-500 text-sm">需支付：</span>
            <span className="text-2xl font-bold text-red-600">¥{(course.price || 39).toFixed(2)}</span>
          </div>
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={isProcessing || !agreeTerms || (!isBalanceSufficient && selectedPaymentMethod === 'balance')}
          className={`w-full py-3 rounded-lg font-medium ${isProcessing ? 
            'bg-gray-300 text-white cursor-not-allowed' : 
            'bg-red-500 text-white hover:bg-red-600'}`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2">⟳</span>
              处理中...
            </span>
          ) : (
            '确认预约并支付'
          )}
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

// 支付方式选项组件
interface PaymentMethodOptionProps {
  id: string;
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  disabled?: boolean;
  errorText?: string;
}

const PaymentMethodOption: React.FC<PaymentMethodOptionProps> = ({ 
  selected, 
  onSelect, 
  icon, 
  title, 
  subtitle, 
  disabled = false,
  errorText 
}) => (
  <button 
    onClick={onSelect}
    disabled={disabled}
    className={`w-full flex items-center justify-between p-3 border rounded-lg transition-colors ${selected ? 
      'border-green-500 bg-green-50' : 
      disabled ? 'border-gray-200 bg-gray-100' : 'border-gray-200 hover:bg-gray-50'}`}
  >
    <div className="flex items-center">
      <div className={`mr-3 ${disabled ? 'text-gray-400' : ''}`}>
        {icon}
      </div>
      <div>
        <h4 className={`font-medium ${disabled ? 'text-gray-400' : 'text-[#333]'}`}>{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        {errorText && (
          <p className="text-xs text-red-500 mt-0.5">{errorText}</p>
        )}
      </div>
    </div>
    <div>
      {selected ? (
        <Check size={20} className="text-green-600" />
      ) : (
        <div className="w-5 h-5 rounded-full border border-gray-300"></div>
      )}
    </div>
  </button>
);
