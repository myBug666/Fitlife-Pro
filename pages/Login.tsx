import React, { useState } from 'react';
import { ApiService } from '../services/apiService';
import { User } from '../types';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleWeChatLogin = async () => {
    setLoading(true);
    try {
      // Mock passing a code from wx.login()
      const user = await ApiService.login("mock_wx_code_123");
      onLoginSuccess(user);
    } catch (e) {
      alert("登录失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="mb-12 text-center">
        <div className="w-24 h-24 bg-[#32CD32] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            <line x1="12" y1="2" x2="12" y2="12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">FitLife 健身</h1>
        <p className="text-gray-500 mt-2">专业的会员运动管理助手</p>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <button
          onClick={handleWeChatLogin}
          disabled={loading}
          className="w-full bg-[#07c160] hover:bg-[#06ad56] text-white font-medium py-3 rounded-lg flex items-center justify-center transition-all active:scale-95"
        >
          {loading ? (
            <span className="animate-spin mr-2">⟳</span>
          ) : (
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.5,14.5c0-3.5,3.5-6.5,7-6.5s7,3,7,6.5c0,3.5-3.5,6.5-7,6.5c-0.5,0-1,0-1.5-0.1c-0.5,0.5-1.5,1.1-2.5,1.1c-0.5,0-0.5-0.5-0.5-0.5c0-0.5,0.1-1.1,0.5-1.5C9,18.5,8.5,16.5,8.5,14.5z M2.5,9.5c0-3.5,3.5-6.5,7-6.5c3.5,0,7,3,7,6.5c0,0.5-0.1,1.1-0.2,1.6c-0.7-0.4-1.5-0.6-2.3-0.6c-4.5,0-8,3.5-8,8c0,0.7,0.1,1.4,0.3,2.1C5,20.5,2.5,17.5,2.5,9.5z" />
            </svg>
          )}
          {loading ? '授权登录中...' : '微信一键登录'}
        </button>
        
        <p className="text-xs text-center text-gray-400 mt-6">
          登录即代表您同意《用户服务协议》与《隐私政策》
        </p>
      </div>
    </div>
  );
};