// 性能优化工具类
import { Platform } from 'react-native';

class PerformanceUtils {
  // 缓存数据
  private static cache: Map<string, { data: any; timestamp: number; expiry?: number }> = new Map();

  /**
   * 缓存数据
   * @param key 缓存键
   * @param data 缓存数据
   * @param expiry 过期时间（毫秒）
   */
  static setCache(key: string, data: any, expiry?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: expiry ? Date.now() + expiry : undefined,
    });
    // 存储到 AsyncStorage 以便持久化
    this.persistCache();
  }

  /**
   * 获取缓存数据
   * @param key 缓存键
   * @returns 缓存数据或null
   */
  static getCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    // 检查是否过期
    if (cached.expiry && Date.now() > cached.expiry) {
      this.cache.delete(key);
      this.persistCache();
      return null;
    }

    return cached.data;
  }

  /**
   * 清除特定缓存
   * @param key 缓存键
   */
  static clearCache(key: string): void {
    this.cache.delete(key);
    this.persistCache();
  }

  /**
   * 清除所有缓存
   */
  static clearAllCache(): void {
    this.cache.clear();
    this.persistCache();
  }

  /**
   * 持久化缓存到 AsyncStorage
   */
  private static persistCache(): void {
    if (Platform.OS === 'web') {
      try {
        // 在web端使用localStorage
        const cacheArray = Array.from(this.cache.entries());
        localStorage.setItem('fitlife_cache', JSON.stringify(cacheArray));
      } catch (error) {
        console.error('缓存持久化失败:', error);
      }
    } else {
      // 在原生端可以使用AsyncStorage，但这里简化处理
      // 实际项目中需要导入和使用AsyncStorage
    }
  }

  /**
   * 从持久化存储加载缓存
   */
  static loadCache(): void {
    if (Platform.OS === 'web') {
      try {
        const cached = localStorage.getItem('fitlife_cache');
        if (cached) {
          const cacheArray = JSON.parse(cached);
          this.cache = new Map(cacheArray);
        }
      } catch (error) {
        console.error('缓存加载失败:', error);
      }
    }
  }

  /**
   * 防抖函数
   * @param func 要执行的函数
   * @param delay 延迟时间（毫秒）
   * @returns 防抖后的函数
   */
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  /**
   * 节流函数
   * @param func 要执行的函数
   * @param limit 限制时间（毫秒）
   * @returns 节流后的函数
   */
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /**
   * 测量函数执行时间
   * @param func 要测量的函数
   * @param label 标签
   * @returns 函数执行结果
   */
  static measureExecution<T>(func: () => T, label: string): T {
    const start = performance.now();
    const result = func();
    const end = performance.now();
    console.log(`${label} 执行时间: ${end - start}ms`);
    return result;
  }
}

export default PerformanceUtils;