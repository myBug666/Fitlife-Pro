import React, { useState } from 'react';
import { User } from '../types';
import { UserIcon, Phone, Calendar, Mail, ArrowLeft, Edit, Check } from 'lucide-react';

interface PersonalInfoProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ user, onUpdateUser }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<User>({ ...user });

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdateUser(formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setEditing(false);
  };

  // 格式化手机号显示
  const formatPhone = (phone: string) => {
    if (!phone || phone.length !== 11) return phone;
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1 **** $2');
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b border-gray-100">
        <div className="flex items-center justify-between h-12 px-4">
          <div className="flex items-center">
            <button className="p-2 -ml-2">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-medium ml-1">个人信息</h1>
          </div>
          {!editing && (
            <button onClick={() => setEditing(true)} className="text-green-600 text-sm">
              <Edit size={18} className="inline-block mr-1" />
              编辑
            </button>
          )}
          {editing && (
            <div className="flex space-x-4">
              <button onClick={handleCancel} className="text-gray-500 text-sm">
                取消
              </button>
              <button onClick={handleSave} className="text-green-600 text-sm">
                <Check size={18} className="inline-block mr-1" />
                保存
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 头像区域 */}
      <div className="pt-24 pb-8 flex flex-col items-center">
        <div className="relative mb-3">
          <img 
            src={formData.avatarUrl || 'https://via.placeholder.com/100'} 
            alt="用户头像" 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          {editing && (
            <button className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              <Edit size={16} />
            </button>
          )}
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!editing}
              className={`${editing ? 'border-b border-green-500 focus:outline-none' : 'font-medium'}`}
              style={{ fontSize: editing ? '16px' : 'inherit' }}
            />
          </div>
          <p className="text-sm text-gray-500">{formatPhone(formData.phone)}</p>
        </div>
      </div>

      {/* 信息列表 */}
      <div className="px-4 space-y-2">
        <InfoItem 
          label="会员卡号" 
          value={`MC${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`} 
          editable={false}
        />
        
        <InfoItem 
          label="手机号" 
          value={formData.phone} 
          editable={editing}
          onChange={(value) => handleInputChange('phone', value)}
          icon={<Phone size={18} />}
        />
        
        <InfoItem 
          label="邮箱" 
          value={formData.email || '未设置'} 
          editable={editing}
          onChange={(value) => handleInputChange('email', value)}
          icon={<Mail size={18} />}
          placeholder="请输入邮箱地址"
        />
        
        <InfoItem 
          label="出生日期" 
          value={formData.birthDate || '未设置'} 
          editable={editing}
          onChange={(value) => handleInputChange('birthDate', value)}
          icon={<Calendar size={18} />}
          placeholder="请选择出生日期"
        />
        
        <InfoItem 
          label="性别" 
          value={formData.gender || '未设置'} 
          editable={editing}
          onChange={(value) => handleInputChange('gender', value)}
          icon={<UserIcon size={18} />}
          placeholder="请选择性别"
        />
        
        <InfoItem 
          label="简介" 
          value={formData.bio || '未设置'} 
          editable={editing}
          onChange={(value) => handleInputChange('bio', value)}
          placeholder="请输入个人简介"
          multiline
        />
      </div>

      {/* 保存提示 */}
      {editing && (
        <div className="mt-8 px-4">
          <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg">
            请确保您的个人信息准确无误，以便我们为您提供更好的服务。
          </p>
        </div>
      )}
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
  editable: boolean;
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  multiline?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ 
  label, 
  value, 
  editable, 
  onChange, 
  icon,
  placeholder,
  multiline = false
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="py-4 border-b border-gray-100">
      <div className="flex items-start">
        <div className="mr-3 text-gray-400">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          {editable ? (
            multiline ? (
              <textarea
                value={inputValue}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-2 text-[#333] focus:outline-none focus:border-green-500"
                placeholder={placeholder}
                rows={3}
                style={{ resize: 'none' }}
              />
            ) : (
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-2 text-[#333] focus:outline-none focus:border-green-500"
                placeholder={placeholder}
              />
            )
          ) : (
            <p className="text-[#333]">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
};
