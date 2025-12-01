import React, { useState } from 'react';
import { TabBar } from './components/TabBar';
import { Home } from './pages/Home';
import { Booking } from './pages/Booking';
import { Statistics } from './pages/Statistics';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { CourseDetail } from './pages/CourseDetail';
import { BookingConfirm } from './pages/BookingConfirm';
import { BookingSuccess } from './pages/BookingSuccess';
import { CardManagement } from './pages/CardManagement';
import { PersonalInfo } from './pages/PersonalInfo';
import { PointsPage } from './pages/PointsPage';
import { BodyMetrics } from './pages/BodyMetrics';
import { Settings } from './pages/Settings';
import { TabKey, User, Course } from './types';
import { themeManager, useTheme } from './utils/ThemeManager';

// 定义应用状态类型
type AppState = 
  | { page: 'tabs'; activeTab: TabKey }
  | { page: 'courseDetail'; course: Course }
  | { page: 'bookingConfirm'; course: Course }
  | { page: 'bookingSuccess'; course: Course }
  | { page: 'cardManagement' }
  | { page: 'personalInfo' }
  | { page: 'pointsPage' }
  | { page: 'bodyMetrics' }
  | { page: 'settings' };

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [appState, setAppState] = useState<AppState>({ page: 'tabs', activeTab: 'home' });

  if (!user) {
    return <Login onLoginSuccess={setUser} />;
  }

  const handleTabChange = (tab: TabKey) => {
    setAppState({ page: 'tabs', activeTab: tab });
  };

  const handleOpenCourseDetail = (course: Course) => {
    setAppState({ page: 'courseDetail', course });
  };

  const handleBookCourse = (course: Course) => {
    setAppState({ page: 'bookingConfirm', course });
  };

  const handleConfirmBooking = (course: Course, paymentMethod: string) => {
    // 模拟支付逻辑
    if (paymentMethod === 'balance' && user) {
      setUser(prev => ({
        ...prev,
        balance: prev.balance - (course.price || 39)
      }));
    }
    setAppState({ page: 'bookingSuccess', course });
  };

  const handleBackToHome = () => {
    setAppState({ page: 'tabs', activeTab: 'home' });
  };

  const handleViewBooking = () => {
    setAppState({ page: 'tabs', activeTab: 'booking' });
  };

  const handleBackFromDetail = () => {
    // 根据当前页面决定返回逻辑
    const current = appState.page;
    if (current === 'courseDetail') {
      setAppState({ page: 'tabs', activeTab: 'home' });
    } else if (current === 'bookingConfirm') {
      setAppState({ page: 'courseDetail', course: appState.course });
    } else if (current === 'bookingSuccess') {
      setAppState({ page: 'tabs', activeTab: 'home' });
    } else if (current === 'cardManagement' || current === 'personalInfo' || current === 'pointsPage') {
      setAppState({ page: 'tabs', activeTab: 'profile' });
    }
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleOpenCardManagement = () => {
    setAppState({ page: 'cardManagement' });
  };

  const handleOpenPersonalInfo = () => {
    setAppState({ page: 'personalInfo' });
  };

  const handleOpenPointsPage = () => {
    setAppState({ page: 'pointsPage' });
  };

  const handleOpenBodyMetrics = () => {
    setAppState({ page: 'bodyMetrics' });
  };

  const handleOpenSettings = () => {
    setAppState({ page: 'settings' });
  };

  const renderContent = () => {
    // 渲染标签页内容
    const renderTabContent = () => {
      switch (appState.activeTab) {
        case 'home':
          return <Home onOpenCourseDetail={handleOpenCourseDetail} />;
        case 'booking':
          return <Booking user={user} onOpenCourseDetail={handleOpenCourseDetail} />;
        case 'statistics':
          return <Statistics />;
        case 'profile':
          return (
            <Profile 
              user={user} 
              onOpenCardManagement={handleOpenCardManagement}
              onOpenPersonalInfo={handleOpenPersonalInfo}
              onOpenPointsPage={handleOpenPointsPage}
              onOpenBodyMetrics={handleOpenBodyMetrics}
              onOpenSettings={handleOpenSettings}
            />
          );
        default:
          return <Home onOpenCourseDetail={handleOpenCourseDetail} />;
      }
    };

    // 根据应用状态渲染不同页面
    switch (appState.page) {
      case 'tabs':
        return renderTabContent();
      case 'courseDetail':
        return (
          <CourseDetail 
            course={appState.course} 
            onBook={handleBookCourse}
            onBack={handleBackFromDetail}
          />
        );
      case 'bookingConfirm':
        return (
          <BookingConfirm 
            course={appState.course}
            user={user}
            onConfirm={handleConfirmBooking}
            onCancel={handleBackFromDetail}
          />
        );
      case 'bookingSuccess':
        return (
          <BookingSuccess 
            course={appState.course}
            onBackToHome={handleBackToHome}
            onViewBooking={handleViewBooking}
          />
        );
      case 'cardManagement':
        return <CardManagement user={user} />;
      case 'personalInfo':
        return <PersonalInfo user={user} onUpdateUser={handleUpdateUser} />;
      case 'pointsPage':
          return <PointsPage user={user} />;
        case 'bodyMetrics':
          return <BodyMetrics user={user} onBack={handleBackFromDetail} />;
        case 'settings':
          return <Settings onBack={handleBackFromDetail} />;
        default:
          return renderTabContent();
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-base font-sans antialiased text-[#333]">
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative shadow-2xl">
        {/* Main Content Area */}
        <main className="h-full">
          {renderContent()}
        </main>

        {/* Navigation */}
        {appState.page === 'tabs' && <TabBar activeTab={appState.activeTab} onTabChange={handleTabChange} />}
      </div>
    </div>
  );
}

export default App;