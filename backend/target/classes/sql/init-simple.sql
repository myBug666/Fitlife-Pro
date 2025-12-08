-- 简化版数据库初始化脚本，包含课程时间表和课程预约表

-- 创建课程时间表
CREATE TABLE IF NOT EXISTS `course_schedule` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '课程时间ID',
  `course_id` bigint NOT NULL COMMENT '课程ID',
  `start_time` datetime NOT NULL COMMENT '开始时间',
  `end_time` datetime NOT NULL COMMENT '结束时间',
  `location` varchar(64) DEFAULT NULL COMMENT '上课地点',
  `max_people` int DEFAULT NULL COMMENT '最大预约人数',
  `booked_people` int DEFAULT '0' COMMENT '已预约人数',
  `status` tinyint DEFAULT '1' COMMENT '课程状态：0-已取消，1-正常，2-已满',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程时间表';

-- 创建课程预约表
CREATE TABLE IF NOT EXISTS `course_booking` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '预约ID',
  `member_id` bigint NOT NULL COMMENT '会员ID',
  `course_id` bigint NOT NULL COMMENT '课程ID',
  `schedule_id` bigint NOT NULL COMMENT '课程时间安排ID',
  `amount` decimal(10,2) DEFAULT '0.00' COMMENT '支付金额',
  `status` tinyint DEFAULT '1' COMMENT '预约状态：0-已取消，1-已预约，2-已完成，3-已过期',
  `pay_status` tinyint DEFAULT '0' COMMENT '支付状态：0-未支付，1-已支付，2-支付失败，3-已退款',
  `pay_time` datetime DEFAULT NULL COMMENT '支付时间',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`),
  KEY `idx_member_id` (`member_id`),
  KEY `idx_course_id` (`course_id`),
  KEY `idx_schedule_id` (`schedule_id`),
  KEY `idx_status` (`status`),
  KEY `idx_pay_status` (`pay_status`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程预约表';

-- 插入测试课程时间数据（使用固定的未来时间）
INSERT INTO `course_schedule` (`course_id`, `start_time`, `end_time`, `location`, `max_people`, `booked_people`, `status`) VALUES
(1, '2026-01-01 09:00:00', '2026-01-01 10:00:00', '瑜伽室A', 20, 5, 1),
(2, '2026-01-01 10:30:00', '2026-01-01 11:15:00', '有氧教室', 30, 12, 1),
(3, '2026-01-01 14:00:00', '2026-01-01 15:00:00', '力量训练室', 15, 8, 1),
(1, '2026-01-02 09:00:00', '2026-01-02 10:00:00', '瑜伽室A', 20, 3, 1),
(2, '2026-01-02 10:30:00', '2026-01-02 11:15:00', '有氧教室', 30, 15, 1),
(3, '2026-01-02 14:00:00', '2026-01-02 15:00:00', '力量训练室', 15, 10, 1);

-- 插入测试会员数据
CREATE TABLE IF NOT EXISTS `member` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '会员ID',
  `member_id` bigint NOT NULL COMMENT '会员编号',
  `nickname` varchar(64) DEFAULT NULL COMMENT '昵称',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `level` tinyint DEFAULT '0' COMMENT '会员等级',
  `status` tinyint DEFAULT '1' COMMENT '会员状态：0-禁用，1-正常',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会员表';

INSERT INTO `member` (`member_id`, `nickname`, `phone`, `level`, `status`) VALUES
(10001, '测试会员', '13800138000', 0, 1);

-- 插入测试课程数据
CREATE TABLE IF NOT EXISTS `course` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '课程ID',
  `name` varchar(100) NOT NULL COMMENT '课程名称',
  `type` tinyint DEFAULT '0' COMMENT '课程类型：0-团课，1-私教',
  `difficulty` tinyint DEFAULT '0' COMMENT '课程难度：0-初级，1-中级，2-高级',
  `price` decimal(10,2) DEFAULT '0.00' COMMENT '课程价格',
  `status` tinyint DEFAULT '1' COMMENT '课程状态：0-未上架，1-已上架，2-已下架',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程表';

INSERT INTO `course` (`name`, `type`, `difficulty`, `price`, `status`) VALUES
('瑜伽基础课', 0, 0, 50.00, 1),
('有氧健身操', 0, 1, 60.00, 1),
('力量训练', 0, 2, 70.00, 1);
