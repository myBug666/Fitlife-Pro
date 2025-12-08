import { COLORS, SENIOR_COLORS, FONTS, SENIOR_FONTS, SPACING, SENIOR_SPACING, BUTTON_SIZES, SENIOR_BUTTON_SIZES } from '../constants';

// 主题类型
export type ThemeMode = 'standard' | 'senior';

// 主题配置接口
interface ThemeConfig {
  colors: typeof COLORS;
  fonts: typeof FONTS;
  spacing: typeof SPACING;
  buttonSizes: typeof BUTTON_SIZES;
  mode: ThemeMode;
}

class ThemeManager {
  private static instance: ThemeManager;
  private currentMode: ThemeMode = 'standard';
  private listeners: Set<() => void> = new Set();

  private constructor() {
    // 初始化时尝试从本地存储加载主题设置
    this.loadThemeFromStorage();
  }

  // 单例模式
  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  // 获取当前主题配置
  public getTheme(): ThemeConfig {
    return {
      colors: this.currentMode === 'senior' ? SENIOR_COLORS : COLORS,
      fonts: this.currentMode === 'senior' ? SENIOR_FONTS : FONTS,
      spacing: this.currentMode === 'senior' ? SENIOR_SPACING : SPACING,
      buttonSizes: this.currentMode === 'senior' ? SENIOR_BUTTON_SIZES : BUTTON_SIZES,
      mode: this.currentMode
    };
  }

  // 获取当前模式
  public getMode(): ThemeMode {
    return this.currentMode;
  }

  // 设置主题模式
  public setMode(mode: ThemeMode): void {
    if (this.currentMode !== mode) {
      this.currentMode = mode;
      this.saveThemeToStorage();
      this.notifyListeners();
    }
  }

  // 切换主题模式
  public toggleMode(): void {
    this.setMode(this.currentMode === 'standard' ? 'senior' : 'standard');
  }

  // 添加主题变化监听器
  public addListener(listener: () => void): () => void {
    this.listeners.add(listener);
    // 返回取消监听函数
    return () => {
      this.listeners.delete(listener);
    };
  }

  // 通知所有监听器
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // 保存主题设置到本地存储
  private saveThemeToStorage(): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('fitlife_theme_mode', this.currentMode);
      }
    } catch (error) {
      console.error('保存主题设置失败:', error);
    }
  }

  // 从本地存储加载主题设置
  private loadThemeFromStorage(): void {
    try {
      if (typeof localStorage !== 'undefined') {
        const savedMode = localStorage.getItem('fitlife_theme_mode') as ThemeMode | null;
        if (savedMode && (savedMode === 'standard' || savedMode === 'senior')) {
          this.currentMode = savedMode;
        }
      }
    } catch (error) {
      console.error('加载主题设置失败:', error);
    }
  }

  // 获取适老化状态
  public isSeniorMode(): boolean {
    return this.currentMode === 'senior';
  }
}

// 创建并导出单例实例
export const themeManager = ThemeManager.getInstance();

// React Hook 用于在组件中使用主题
export const useTheme = (): ThemeConfig => {
  const [theme, setTheme] = React.useState(themeManager.getTheme());

  React.useEffect(() => {
    // 监听主题变化
    const unsubscribe = themeManager.addListener(() => {
      setTheme(themeManager.getTheme());
    });

    // 清理函数
    return () => {
      unsubscribe();
    };
  }, []);

  return theme;
};

export default ThemeManager;