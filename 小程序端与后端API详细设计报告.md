# 健身会员管理小程序端与后端API详细设计报告

## 1. 项目概述

### 1.1 项目背景
FitLife健身会员管理小程序是一个为健身俱乐部设计的智能管理系统，旨在提供便捷的课程预约、会员管理、体测数据追踪等功能，提升用户体验和俱乐部运营效率。

### 1.2 项目目标
- 提供便捷的课程浏览和预约功能
- 实现会员信息管理和会员卡服务
- 支持体测数据记录和统计分析
- 实现课程预约的完整流程（预约、取消、完成）
- 提供用户个性化推荐和通知服务

## 2. 技术架构

### 2.1 前端技术栈
- **开发框架**: React 18 + TypeScript
- **UI组件库**: 自定义组件（TabBar、课程卡片等）
- **状态管理**: React Hooks（useState, useEffect）
- **路由管理**: 自定义路由系统
- **API请求**: Fetch API
- **工具库**: date-fns（日期处理）、axios（HTTP客户端）
- **构建工具**: Vite

### 2.2 后端技术栈
- **开发框架**: Spring Boot 2.7.15
- **ORM框架**: MyBatis Plus 3.5.3.1
- **数据库**: MySQL 8.0.33（生产环境）、H2（开发环境）
- **安全认证**: Spring Security
- **API文档**: Swagger 3.0
- **缓存**: Redis
- **构建工具**: Maven

### 2.3 系统架构图
```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│     小程序前端       │     │     后端API服务     │     │       数据库        │
├─────────────────────┤     ├─────────────────────┤     ├─────────────────────┤
│ 页面组件层          │     │ Controller层        │     │ 会员表（member）     │
│ - Home              │────▶│ - AuthController    │────▶│ 课程表（course）     │
│ - Booking           │     │ - CourseController  │     │ 课程时间表（course_  │
│ - Statistics        │     │ - CourseBookingCtrl │     │  schedule）         │
│ - Profile           │     │ - MemberController  │     │ 预约表（course_      │
├─────────────────────┤     ├─────────────────────┤     │  booking）          │
│ 服务层              │     │ Service层           │     │ 体测数据表（physical_│
│ - apiService        │     │ - CourseBookingSvc  │     │  test）             │
│ - mockDataService   │     │ - CourseService     │     │ 会员卡表（member_    │
├─────────────────────┤     │ - MemberService     │     │  card）             │
│ 工具层              │     ├─────────────────────┤     └─────────────────────┘
│ - ThemeManager      │     │ Mapper层            │
│ - PerformanceUtils  │     │ - CourseBookingMapper│
└─────────────────────┘     │ - CourseMapper      │
                            │ - MemberMapper      │
                            └─────────────────────┘
```

## 3. 小程序端设计

### 3.1 页面结构设计

| 页面名称 | 路径 | 主要功能 |
|---------|------|---------|
| 登录页 | pages/Login | 微信授权登录 |
| 首页 | pages/Home | 展示课程推荐、活动通知等 |
| 课程预约页 | pages/Booking | 浏览和预约课程 |
| 课程详情页 | pages/CourseDetail | 查看课程详细信息 |
| 预约确认页 | pages/BookingConfirm | 确认预约信息并支付 |
| 预约成功页 | pages/BookingSuccess | 显示预约成功信息 |
| 统计数据页 | pages/Statistics | 展示体测数据和训练记录 |
| 个人中心页 | pages/Profile | 管理个人信息、会员卡等 |
| 会员卡管理 | pages/CardManagement | 查看和管理会员卡 |
| 个人信息页 | pages/PersonalInfo | 编辑个人资料 |
| 积分页面 | pages/PointsPage | 查看积分记录 |
| 体测数据页 | pages/BodyMetrics | 记录和查看体测数据 |
| 设置页 | pages/Settings | 系统设置 |

### 3.2 核心组件设计

#### 3.2.1 TabBar组件
**功能**: 实现底部导航栏，支持页面切换
**核心属性**:
- activeTab: 当前激活的标签页
- onTabChange: 标签页切换回调函数

**代码结构**:
```typescript
interface TabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  // 实现逻辑
};
```

#### 3.2.2 课程卡片组件
**功能**: 展示课程信息，支持点击查看详情和预约
**核心属性**:
- course: 课程信息对象
- onBook: 预约按钮点击回调
- onDetail: 详情按钮点击回调

### 3.3 数据模型设计

#### 3.3.1 User（用户信息）
```typescript
interface User {
  id: string;                 // 用户ID
  name: string;               // 用户姓名
  avatar: string;             // 头像URL
  cardType: CardType;         // 会员卡类型
  balance: number;            // 账户余额
  points: number;             // 积分
  expireDate: string;         // 会员卡过期日期
}
```

#### 3.3.2 Course（课程信息）
```typescript
interface Course {
  id: string;                 // 课程ID
  name: string;               // 课程名称
  coach: string;              // 教练姓名
  startTime: string;          // 开始时间
  endTime: string;            // 结束时间
  location: string;           // 上课地点
  capacity: number;           // 最大容量
  booked: number;             // 已预约人数
  color: string;              // 课程颜色标识
  // 扩展字段
  instructor?: string;        // 导师
  duration?: number;          // 时长（分钟）
  price?: number;             // 价格
  intensity?: 'low' | 'medium' | 'high'; // 强度
  description?: string;       // 课程描述
  imageUrl?: string;          // 课程图片
  rating?: number;            // 评分
  tags?: string[];            // 标签
}
```

#### 3.3.3 BodyMetric（体测数据）
```typescript
interface BodyMetric {
  testId: string;             // 测试ID
  memberId: string;           // 会员ID
  testDate: string;           // 测试日期
  weight: number;             // 体重（kg）
  bodyFatRate: number;        // 体脂率（%）
  muscleMass: number;         // 肌肉量（kg）
  bmi: number;                // BMI指数
  waistline: number;          // 腰围（cm）
  hip: number;                // 臀围（cm）
  coachSuggestion: string;    // 教练建议
}
```

### 3.4 API服务层设计

#### 3.4.1 apiService.ts 核心功能
- 封装所有后端API调用
- 统一错误处理
- 数据格式转换
- 模拟数据支持（开发环境）

#### 3.4.2 核心API方法

| 方法名称 | 功能描述 | 请求方式 | 路径 |
|---------|---------|---------|------|
| login | 用户登录 | POST | /api/auth/login |
| getUserInfo | 获取用户信息 | GET | /api/member/info |
| updateUserInfo | 更新用户信息 | PUT | /api/member/info |
| getCourses | 获取课程列表 | GET | /api/course-schedule/list |
| getCourseDetail | 获取课程详情 | GET | /api/course/{id} |
| bookCourse | 预约课程 | POST | /api/course-booking/book |
| cancelBooking | 取消预约 | PUT | /api/course-booking/{id}/cancel |
| getUserBookings | 获取用户预约列表 | GET | /api/booking/user/{userId} |
| getMemberCard | 获取会员卡信息 | GET | /api/member/card |
| rechargeMemberCard | 会员卡充值 | POST | /api/member/card/recharge |
| getPointsHistory | 获取积分记录 | GET | /api/member/points/history |
| getBodyMetrics | 获取体测数据 | GET | /api/member/body-metrics |
| subscribeNotification | 订阅通知 | POST | /api/notification/subscribe |

## 4. 后端API设计

### 4.1 控制器设计

#### 4.1.1 认证控制器（AuthController）
```java
@Tag(name = "认证管理", description = "用户登录认证相关接口")
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Operation(summary = "微信登录", description = "通过微信code获取用户信息")
    @PostMapping("/login")
    public Result<User> login(@RequestParam String code) {
        // 实现微信登录逻辑
    }
}
```

#### 4.1.2 课程预约控制器（CourseBookingController）
```java
@Tag(name = "课程预约管理", description = "课程预约相关接口")
@RestController
@RequestMapping("/course-booking")
public class CourseBookingController {
    @Autowired
    private CourseBookingService courseBookingService;

    @Operation(summary = "分页查询课程预约列表")
    @GetMapping("/list")
    public Result<PageResult<CourseBooking>> listCourseBookings(CourseBookingQueryDTO queryDTO) {
        // 实现分页查询逻辑
    }

    @Operation(summary = "预约课程")
    @PostMapping("/book")
    public Result<CourseBooking> bookCourse(@RequestBody CourseBookingDTO bookingDTO) {
        // 实现课程预约逻辑
    }

    @Operation(summary = "取消预约")
    @PutMapping("/{bookingId}/cancel")
    public Result<Boolean> cancelBooking(@PathVariable Long bookingId) {
        // 实现取消预约逻辑
    }

    @Operation(summary = "完成预约")
    @PutMapping("/{bookingId}/complete")
    public Result<Boolean> completeBooking(@PathVariable Long bookingId) {
        // 实现完成预约逻辑
    }

    @Operation(summary = "根据会员查询预约")
    @GetMapping("/member/{memberId}")
    public Result<List<CourseBooking>> getCourseBookingsByMemberId(@PathVariable Long memberId) {
        // 实现根据会员ID查询预约逻辑
    }
}
```

#### 4.1.3 课程控制器（CourseController）
```java
@Tag(name = "课程管理", description = "课程相关接口")
@RestController
@RequestMapping("/course")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @Operation(summary = "获取课程列表")
    @GetMapping("/list")
    public Result<PageResult<Course>> listCourses(CourseQueryDTO queryDTO) {
        // 实现课程列表查询逻辑
    }

    @Operation(summary = "获取课程详情")
    @GetMapping("/{id}")
    public Result<Course> getCourseById(@PathVariable Long id) {
        // 实现课程详情查询逻辑
    }
}
```

#### 4.1.4 课程时间表控制器（CourseScheduleController）
```java
@Tag(name = "课程时间表管理", description = "课程时间安排相关接口")
@RestController
@RequestMapping("/course-schedule")
public class CourseScheduleController {
    @Autowired
    private CourseScheduleService courseScheduleService;

    @Operation(summary = "获取课程时间表")
    @GetMapping("/list")
    public Result<PageResult<CourseSchedule>> listCourseSchedules(CourseScheduleQueryDTO queryDTO) {
        // 实现课程时间表查询逻辑
    }
}
```

#### 4.1.5 会员控制器（MemberController）
```java
@Tag(name = "会员管理", description = "会员相关接口")
@RestController
@RequestMapping("/member")
public class MemberController {
    @Autowired
    private MemberService memberService;

    @Operation(summary = "获取会员信息")
    @GetMapping("/info")
    public Result<Member> getMemberInfo(@RequestParam Long memberId) {
        // 实现会员信息查询逻辑
    }

    @Operation(summary = "更新会员信息")
    @PutMapping("/info")
    public Result<Member> updateMemberInfo(@RequestBody MemberUpdateDTO memberDTO) {
        // 实现会员信息更新逻辑
    }

    @Operation(summary = "获取体测数据")
    @GetMapping("/body-metrics")
    public Result<List<PhysicalTest>> getBodyMetrics(@RequestParam Long memberId, 
                                                  @RequestParam String startDate, 
                                                  @RequestParam String endDate) {
        // 实现体测数据查询逻辑
    }
}
```

### 4.2 数据模型设计

#### 4.2.1 会员表（member）
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|-----|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 会员ID |
| openid | VARCHAR(100) | UNIQUE NOT NULL | 微信OpenID |
| nickname | VARCHAR(50) | NOT NULL | 昵称 |
| avatar | VARCHAR(255) | | 头像URL |
| phone | VARCHAR(20) | | 手机号码 |
| gender | TINYINT | | 性别（0-未知，1-男，2-女） |
| level | TINYINT | DEFAULT 0 | 会员等级（0-体验卡，1-季卡，2-年卡） |
| balance | DECIMAL(10,2) | DEFAULT 0.00 | 账户余额 |
| points | INT | DEFAULT 0 | 积分 |
| expire_date | DATE | | 会员卡过期日期 |
| create_time | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| update_time | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |
| deleted | TINYINT | DEFAULT 0 | 删除标记（0-正常，1-删除） |

#### 4.2.2 课程表（course）
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|-----|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 课程ID |
| name | VARCHAR(100) | NOT NULL | 课程名称 |
| coach_id | BIGINT | FOREIGN KEY | 教练ID |
| category_id | BIGINT | FOREIGN KEY | 课程类别ID |
| description | TEXT | | 课程描述 |
| duration | INT | NOT NULL | 课程时长（分钟） |
| intensity | TINYINT | NOT NULL | 强度（1-低，2-中，3-高） |
| price | DECIMAL(8,2) | NOT NULL | 课程价格 |
| image_url | VARCHAR(255) | | 课程图片 |
| status | TINYINT | DEFAULT 1 | 状态（0-停用，1-启用） |
| create_time | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| update_time | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |
| deleted | TINYINT | DEFAULT 0 | 删除标记（0-正常，1-删除） |

#### 4.2.3 课程时间表（course_schedule）
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|-----|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 课程时间表ID |
| course_id | BIGINT | FOREIGN KEY NOT NULL | 课程ID |
| coach_id | BIGINT | FOREIGN KEY NOT NULL | 教练ID |
| course_name | VARCHAR(100) | NOT NULL | 课程名称 |
| coach_name | VARCHAR(50) | NOT NULL | 教练姓名 |
| start_time | DATETIME | NOT NULL | 开始时间 |
| end_time | DATETIME | NOT NULL | 结束时间 |
| location | VARCHAR(100) | NOT NULL | 上课地点 |
| max_people | INT | NOT NULL | 最大人数 |
| booked_people | INT | DEFAULT 0 | 已预约人数 |
| status | TINYINT | DEFAULT 1 | 状态（0-取消，1-正常，2-已满） |
| create_time | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| update_time | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |
| deleted | TINYINT | DEFAULT 0 | 删除标记（0-正常，1-删除） |

#### 4.2.4 课程预约表（course_booking）
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|-----|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 预约ID |
| member_id | BIGINT | FOREIGN KEY NOT NULL | 会员ID |
| course_id | BIGINT | FOREIGN KEY NOT NULL | 课程ID |
| schedule_id | BIGINT | FOREIGN KEY NOT NULL | 课程时间安排ID |
| status | TINYINT | DEFAULT 0 | 预约状态（0-待付款，1-已预约，2-已取消，3-已完成，4-已过期） |
| pay_status | TINYINT | DEFAULT 0 | 支付状态（0-未支付，1-已支付） |
| amount | DECIMAL(8,2) | NOT NULL | 支付金额 |
| pay_time | DATETIME | | 支付时间 |
| create_time | DATETIME | DEFAULT CURRENT_TIMESTAMP | 预约时间 |
| update_time | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |
| deleted | TINYINT | DEFAULT 0 | 删除标记（0-正常，1-删除） |

#### 4.2.5 体测数据表（physical_test）
| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|-----|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 测试ID |
| member_id | BIGINT | FOREIGN KEY NOT NULL | 会员ID |
| test_date | DATE | NOT NULL | 测试日期 |
| weight | DECIMAL(5,2) | NOT NULL | 体重（kg） |
| body_fat_rate | DECIMAL(4,1) | NOT NULL | 体脂率（%） |
| muscle_mass | DECIMAL(5,2) | NOT NULL | 肌肉量（kg） |
| bmi | DECIMAL(4,1) | NOT NULL | BMI指数 |
| waistline | DECIMAL(5,1) | NOT NULL | 腰围（cm） |
| hip | DECIMAL(5,1) | NOT NULL | 臀围（cm） |
| coach_suggestion | TEXT | | 教练建议 |
| create_time | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| update_time | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |
| deleted | TINYINT | DEFAULT 0 | 删除标记（0-正常，1-删除） |

### 4.3 业务逻辑设计

#### 4.3.1 课程预约流程
1. **预约请求**：用户选择课程时间段，点击预约按钮
2. **参数验证**：验证课程是否存在、是否已满、是否过期
3. **预约创建**：创建预约记录，状态为"待付款"（status=0）
4. **库存扣减**：更新课程时间表的已预约人数
5. **支付处理**：调用支付接口完成支付
6. **状态更新**：支付成功后，更新预约状态为"已预约"（status=1），支付状态为"已支付"（pay_status=1）
7. **通知用户**：发送预约成功通知

```java
@Service
public class CourseBookingServiceImpl implements CourseBookingService {
    @Autowired
    private CourseBookingMapper courseBookingMapper;
    
    @Autowired
    private CourseScheduleMapper courseScheduleMapper;
    
    @Autowired
    private MemberMapper memberMapper;
    
    @Override
    @Transactional
    public CourseBooking bookCourse(CourseBookingDTO bookingDTO) {
        // 1. 验证课程是否存在且可预约
        CourseSchedule schedule = courseScheduleMapper.selectById(bookingDTO.getScheduleId());
        if (schedule == null) {
            throw new BusinessException("课程不存在");
        }
        if (schedule.getStatus() != 1) {
            throw new BusinessException("课程已取消");
        }
        if (schedule.getBookedPeople() >= schedule.getMaxPeople()) {
            throw new BusinessException("课程已满");
        }
        if (LocalDateTime.now().isAfter(schedule.getStartTime())) {
            throw new BusinessException("课程已过期，无法预约");
        }
        
        // 2. 创建预约记录
        CourseBooking booking = new CourseBooking();
        booking.setMemberId(bookingDTO.getMemberId());
        booking.setCourseId(bookingDTO.getCourseId());
        booking.setScheduleId(bookingDTO.getScheduleId());
        booking.setStatus(0); // 待付款
        booking.setPayStatus(0); // 未支付
        booking.setAmount(bookingDTO.getAmount());
        
        courseBookingMapper.insert(booking);
        
        // 3. 更新课程已预约人数
        schedule.setBookedPeople(schedule.getBookedPeople() + 1);
        courseScheduleMapper.updateById(schedule);
        
        return booking;
    }
}
```

#### 4.3.2 取消预约流程
1. **取消请求**：用户发起取消预约请求
2. **权限验证**：验证是否为本人预约
3. **时间验证**：验证是否在课程开始前2小时以上
4. **状态更新**：更新预约状态为"已取消"（status=2）
5. **库存回滚**：更新课程时间表的已预约人数
6. **退款处理**：如果已支付，进行退款操作
7. **通知用户**：发送取消成功通知

```java
@Override
@Transactional
public boolean cancelBooking(Long bookingId) {
    // 1. 查询预约记录
    CourseBooking booking = courseBookingMapper.selectById(bookingId);
    if (booking == null) {
        throw new BusinessException("预约记录不存在");
    }
    
    // 2. 检查预约状态
    if (booking.getStatus() != 1) {
        throw new BusinessException("该预约已取消或已完成");
    }
    
    // 3. 查询课程时间表
    CourseSchedule schedule = courseScheduleMapper.selectById(booking.getScheduleId());
    
    // 4. 检查取消时间限制
    if (LocalDateTime.now().plusHours(2).isAfter(schedule.getStartTime())) {
        throw new BusinessException("距离课程开始不足2小时，无法取消");
    }
    
    // 5. 更新预约状态
    booking.setStatus(2); // 已取消
    courseBookingMapper.updateById(booking);
    
    // 6. 回滚课程已预约人数
    schedule.setBookedPeople(schedule.getBookedPeople() - 1);
    courseScheduleMapper.updateById(schedule);
    
    // 7. 处理退款（如果已支付）
    if (booking.getPayStatus() == 1) {
        // 调用退款接口
        // 更新支付状态为已退款
    }
    
    return true;
}
```

#### 4.3.3 完成预约流程
1. **完成请求**：课程结束后，系统或教练发起完成请求
2. **状态更新**：更新预约状态为"已完成"（status=3）
3. **积分奖励**：根据课程为会员增加积分
4. **通知用户**：发送课程完成通知

## 5. 核心API接口文档

### 5.1 用户认证API

#### 5.1.1 微信登录
**接口地址**：`POST /api/auth/login`
**请求参数**：
| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| code | string | 是 | 微信登录授权码 |

**响应结果**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "10001",
    "name": "张三",
    "avatar": "https://wx.qlogo.cn/mmopen/vi_32/...",
    "cardType": "尊享年卡",
    "balance": 1000.00,
    "points": 500,
    "expireDate": "2025-12-31"
  }
}
```

### 5.2 课程预约API

#### 5.2.1 获取课程列表
**接口地址**：`GET /api/course-schedule/list`
**请求参数**：
| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| pageNum | int | 否 | 页码（默认1） |
| pageSize | int | 否 | 每页数量（默认10） |
| startTime | string | 是 | 开始时间（ISO格式） |
| endTime | string | 是 | 结束时间（ISO格式） |

**响应结果**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 100,
    "pages": 10,
    "current": 1,
    "size": 10,
    "records": [
      {
        "id": "1",
        "courseId": "1",
        "courseName": "瑜伽课程",
        "coachId": "1",
        "coachName": "张教练",
        "startTime": "2024-12-20T09:00:00",
        "endTime": "2024-12-20T10:00:00",
        "location": "瑜伽室1",
        "maxPeople": 20,
        "bookedPeople": 5,
        "status": 1
      }
      // 更多课程...
    ]
  }
}
```

#### 5.2.2 预约课程
**接口地址**：`POST /api/course-booking/book`
**请求参数**：
```json
{
  "memberId": 10001,
  "courseId": 1,
  "scheduleId": 1,
  "amount": 0
}
```

**响应结果**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "memberId": 10001,
    "courseId": 1,
    "scheduleId": 1,
    "status": 0,
    "payStatus": 0,
    "amount": 0,
    "createTime": "2024-12-20T14:30:00",
    "updateTime": "2024-12-20T14:30:00"
  }
}
```

#### 5.2.3 取消预约
**接口地址**：`PUT /api/course-booking/{bookingId}/cancel`
**请求参数**：
| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| bookingId | long | 是 | 预约ID |

**响应结果**：
```json
{
  "code": 200,
  "message": "success",
  "data": true
}
```

#### 5.2.4 获取用户预约列表
**接口地址**：`GET /api/course-booking/member/{memberId}`
**请求参数**：
| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| memberId | long | 是 | 会员ID |

**响应结果**：
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "memberId": 10001,
      "courseId": 1,
      "scheduleId": 1,
      "status": 1,
      "payStatus": 1,
      "amount": 0,
      "createTime": "2024-12-20T14:30:00"
    }
    // 更多预约...
  ]
}
```

### 5.3 会员信息API

#### 5.3.1 获取用户信息
**接口地址**：`GET /api/member/info`
**请求参数**：
| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| memberId | long | 是 | 会员ID |

**响应结果**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 10001,
    "nickname": "张三",
    "avatar": "https://wx.qlogo.cn/mmopen/vi_32/...",
    "phone": "13800138000",
    "gender": 1,
    "level": 2,
    "balance": 1000.00,
    "points": 500,
    "expireDate": "2025-12-31"
  }
}
```

#### 5.3.2 获取体测数据
**接口地址**：`GET /api/member/body-metrics`
**请求参数**：
| 参数名 | 类型 | 必选 | 描述 |
|-------|------|------|------|
| memberId | long | 是 | 会员ID |
| startDate | string | 是 | 开始日期（YYYY-MM-DD） |
| endDate | string | 是 | 结束日期（YYYY-MM-DD） |

**响应结果**：
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "memberId": 10001,
      "testDate": "2024-12-15",
      "weight": 70.5,
      "bodyFatRate": 18.5,
      "muscleMass": 45.0,
      "bmi": 23.5,
      "waistline": 85.0,
      "hip": 95.0,
      "coachSuggestion": "保持良好饮食，加强有氧运动"
    }
    // 更多体测数据...
  ]
}
```

## 6. 前端页面详细设计

### 6.1 课程预约页面（Booking.tsx）

**功能描述**：展示可预约的课程列表，支持按日期筛选和预约操作

**UI结构**：
- 顶部日期选择器（星期和日期）
- 课程列表（按时间段分组）
- 课程卡片（包含课程名称、教练、时间、地点、剩余名额）
- 底部TabBar

**核心逻辑**：
```typescript
export const Booking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 获取课程列表
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await ApiService.getCourses(selectedDate);
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [selectedDate]);

  // 处理预约
  const handleBookCourse = async (course: Course) => {
    try {
      // 跳转到确认页面
      navigateToBookingConfirm(course);
    } catch (error) {
      console.error('Failed to book course:', error);
      showToast('预约失败，请重试');
    }
  };

  return (
    <div className="booking-page">
      {/* 日期选择器 */}
      <DateSelector 
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate} 
      />
      
      {/* 课程列表 */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <CourseList 
          courses={courses} 
          onBook={handleBookCourse} 
        />
      )}
      
      {/* TabBar */}
      <TabBar activeTab="booking" onTabChange={handleTabChange} />
    </div>
  );
};
```

### 6.2 预约确认页面（BookingConfirm.tsx）

**功能描述**：确认预约信息，选择支付方式，完成预约

**UI结构**：
- 课程信息（名称、时间、地点、教练）
- 用户信息（姓名、会员卡类型）
- 支付信息（金额、支付方式选择）
- 确认预约按钮

**核心逻辑**：
```typescript
export const BookingConfirm: React.FC<{ course: Course }> = ({ course }) => {
  const [user, setUser] = useState<User | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [loading, setLoading] = useState<boolean>(false);

  // 获取用户信息
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await ApiService.getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  // 处理确认预约
  const handleConfirmBooking = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const result = await ApiService.bookCourse(
        course.id,
        user.id,
        course.id, // scheduleId
        course.price || 0
      );
      
      if (result.success) {
        // 跳转到成功页面
        navigateToBookingSuccess(course);
      }
    } catch (error) {
      console.error('Failed to confirm booking:', error);
      showToast('预约失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-confirm-page">
      {/* 课程信息 */}
      <CourseInfoSection course={course} />
      
      {/* 用户信息 */}
      <UserInfoSection user={user} />
      
      {/* 支付信息 */}
      <PaymentSection 
        paymentMethod={paymentMethod} 
        onPaymentMethodChange={setPaymentMethod} 
        amount={course.price || 0} 
      />
      
      {/* 确认按钮 */}
      <Button 
        text="确认预约" 
        onClick={handleConfirmBooking} 
        loading={loading} 
        disabled={!user || loading} 
      />
    </div>
  );
};
```

## 7. 系统安全设计

### 7.1 前端安全
- **数据加密**：敏感数据在传输过程中使用HTTPS加密
- **输入验证**：所有用户输入进行严格验证，防止XSS攻击
- **权限控制**：根据用户角色显示不同功能
- **本地存储**：不存储敏感信息，使用安全的存储方式

### 7.2 后端安全
- **身份认证**：使用微信登录和JWT令牌验证用户身份
- **授权控制**：基于Spring Security的角色权限控制
- **输入验证**：使用@Valid和@NotNull注解验证请求参数
- **SQL注入防护**：使用MyBatis Plus的参数化查询
- **CSRF防护**：启用Spring Security的CSRF防护
- **接口限流**：使用Redis实现接口限流，防止恶意请求
- **数据脱敏**：敏感数据（如手机号）在返回时进行脱敏处理

## 8. 性能优化

### 8.1 前端性能优化
- **代码分割**：使用React.lazy和Suspense实现组件懒加载
- **图片优化**：使用WebP格式，实现图片懒加载
- **缓存策略**：缓存API请求结果，减少网络请求
- **虚拟列表**：长列表使用虚拟滚动，提高渲染性能
- **减少重渲染**：使用React.memo和useMemo优化组件渲染

### 8.2 后端性能优化
- **数据库索引**：为频繁查询的字段创建索引
- **连接池优化**：使用HikariCP连接池，优化连接参数
- **缓存优化**：使用Redis缓存热点数据（课程列表、用户信息）
- **异步处理**：使用@Async处理耗时操作
- **分页查询**：所有列表查询实现分页，避免一次性返回大量数据
- **SQL优化**：优化复杂查询，减少数据库压力

## 9. 测试策略

### 9.1 前端测试
- **单元测试**：使用Jest测试组件和工具函数
- **集成测试**：使用React Testing Library测试组件交互
- **E2E测试**：使用Cypress测试完整用户流程
- **性能测试**：使用Lighthouse测试页面性能

### 9.2 后端测试
- **单元测试**：使用JUnit和Mockito测试Service层
- **集成测试**：使用TestRestTemplate测试API接口
- **数据库测试**：使用H2内存数据库测试数据访问层
- **性能测试**：使用JMeter测试接口性能和并发能力

## 10. 部署与运维

### 10.1 前端部署
- **构建**：使用Vite构建生产版本
- **部署**：部署到小程序云开发环境或Nginx服务器
- **CDN**：使用CDN加速静态资源访问

### 10.2 后端部署
- **构建**：使用Maven打包成Jar包
- **部署**：部署到Tomcat或直接运行Jar包
- **容器化**：使用Docker容器化部署
- **监控**：使用Spring Boot Actuator和Prometheus监控系统状态
- **日志**：使用ELK Stack收集和分析日志

### 10.3 数据库部署
- **主从复制**：实现数据库主从复制，提高可用性
- **备份策略**：定期全量备份和增量备份
- **监控**：监控数据库性能和状态

## 11. 总结

FitLife健身会员管理小程序采用前后端分离架构，前端使用React+TypeScript构建，后端使用Spring Boot+MyBatis Plus实现，提供了完整的课程预约功能。系统设计遵循了模块化、可扩展性和安全性原则，能够满足健身俱乐部的日常运营需求和会员的使用体验。

通过详细的API设计和业务逻辑实现，系统能够支持课程浏览、预约、取消、完成等完整流程，并提供了会员管理、体测数据追踪等辅助功能。系统还具备良好的性能和安全性，可以支持大量用户的并发访问。

未来可以进一步优化的方向包括：
- 增加AI课程推荐功能
- 实现智能排课系统
- 增加社交分享功能
- 优化移动端体验
- 支持更多支付方式