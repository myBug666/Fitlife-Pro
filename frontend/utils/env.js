// utils/env.js

/**
 * 检测当前运行环境
 * @returns {Object} 环境信息对象
 */
export const detectEnvironment = () => {
  // 检测是否为微信小程序环境
  const isWxMiniProgram = typeof wx !== 'undefined' && typeof wx.login === 'function';
  // 检测是否为Web环境
  const isWeb = typeof window !== 'undefined' && typeof document !== 'undefined';
  
  return {
    isWxMiniProgram,
    isWeb,
    // 获取当前环境名称
    getEnvName: () => {
      if (isWxMiniProgram) return 'wx-miniprogram';
      if (isWeb) return 'web';
      return 'unknown';
    }
  };
};

/**
 * 导出当前环境信息
 */
export const env = detectEnvironment();
