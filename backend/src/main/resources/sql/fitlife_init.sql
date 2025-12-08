-- 健身会员管理小程序数据库初始化脚本

-- 创建数据库
CREATE DATABASE IF NOT EXISTS `fitlife_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `fitlife_db`;

-- 创建会员表
CREATE TABLE `member` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '会员ID',
  `openid` varchar(64) NOT NULL COMMENT '微信openid',
  `nickname` varchar(32) DEFAULT NULL COMMENT '会员昵称',
  `avatar` varchar(255) DEFAULT NULL COMMENT '会员头像',
  `real_name` varchar(16) DEFAULT NULL COMMENT '真实姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号码',
  `gender` tinyint DEFAULT '0' COMMENT '性别：0-未知，1-男，2-女',
  `birth_date` datetime DEFAULT NULL COMMENT '出生日期',
  `height` double DEFAULT NULL COMMENT '身高（cm）',
  `weight` double DEFAULT NULL COMMENT '体重（kg）',
  `level` tinyint DEFAULT '0' COMMENT '会员等级：0-普通会员，1-银卡会员，2-金卡会员，3-钻石会员',
  `status` tinyint DEFAULT '1' COMMENT '会员状态：0-未激活，1-正常，2-冻结',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_openid` (`openid`),
  INDEX `idx_phone` (`phone`),
  INDEX `idx_level` (`level`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会员表';

-- 创建课程分类表
CREATE TABLE `course_category` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(32) NOT NULL COMMENT '分类名称',
  `description` varchar(255) DEFAULT NULL COMMENT '分类描述',
  `icon` varchar(255) DEFAULT NULL COMMENT '分类图标',
  `parent_id` bigint DEFAULT '0' COMMENT '父分类ID',
  `sort` int DEFAULT '0' COMMENT '分类排序',
  `status` tinyint DEFAULT '1' COMMENT '分类状态：0-禁用，1-启用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`),
  INDEX `idx_parent_id` (`parent_id`),
  INDEX `idx_sort` (`sort`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程分类表';

-- 创建教练表
CREATE TABLE `coach` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '教练ID',
  `name` varchar(16) NOT NULL COMMENT '教练姓名',
  `avatar` varchar(255) DEFAULT NULL COMMENT '教练头像',
  `gender` tinyint DEFAULT '0' COMMENT '教练性别：0-未知，1-男，2-女',
  `phone` varchar(11) DEFAULT NULL COMMENT '教练手机',
  `introduction` varchar(512) DEFAULT NULL COMMENT '教练简介',
  `qualifications` varchar(255) DEFAULT NULL COMMENT '专业资质（用逗号分隔）',
  `specialties` varchar(255) DEFAULT NULL COMMENT '擅长课程（用逗号分隔）',
  `level` tinyint DEFAULT '0' COMMENT '教练等级：0-初级教练，1-中级教练，2-高级教练，3-金牌教练',
  `status` tinyint DEFAULT '1' COMMENT '教练状态：0-休息中，1-工作中，2-已离职',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`),
  INDEX `idx_level` (`level`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='教练表';

-- 创建课程表
CREATE TABLE `course` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '课程ID',
  `name` varchar(64) NOT NULL COMMENT '课程名称',
  `description` varchar(512) DEFAULT NULL COMMENT '课程描述',
  `image` varchar(255) DEFAULT NULL COMMENT '课程图片',
  `category_id` bigint DEFAULT NULL COMMENT '课程分类ID',
  `coach_id` bigint DEFAULT NULL COMMENT '教练ID',
  `duration` int DEFAULT NULL COMMENT '课程时长（分钟）',
  `price` decimal(10,2) DEFAULT NULL COMMENT '课程价格',
  `status` tinyint DEFAULT '1' COMMENT '课程状态：0-未上架，1-已上架，2-已下架',
  `max_people` int DEFAULT NULL COMMENT '最大预约人数',
  `booked_people` int DEFAULT '0' COMMENT '已预约人数',
  `tags` varchar(255) DEFAULT NULL COMMENT '课程标签（用逗号分隔）',
  `type` tinyint DEFAULT '0' COMMENT '课程类型：0-团课，1-私教',
  `difficulty` tinyint DEFAULT '0' COMMENT '课程难度：0-初级，1-中级，2-高级',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`),
  INDEX `idx_category_id` (`category_id`),
  INDEX `idx_coach_id` (`coach_id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_type` (`type`),
  INDEX `idx_difficulty` (`difficulty`),
  CONSTRAINT `fk_course_category` FOREIGN KEY (`category_id`) REFERENCES `course_category` (`id`),
  CONSTRAINT `fk_course_coach` FOREIGN KEY (`coach_id`) REFERENCES `coach` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程表';

-- 创建课程表
CREATE TABLE `course_schedule` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '课程表ID',
  `course_id` bigint NOT NULL COMMENT '课程ID',
  `start_time` datetime NOT NULL COMMENT '上课时间',
  `end_time` datetime NOT NULL COMMENT '下课时间',
  `location` varchar(64) DEFAULT NULL COMMENT '上课地点',
  `max_people` int DEFAULT NULL COMMENT '最大预约人数',
  `booked_people` int DEFAULT '0' COMMENT '已预约人数',
  `status` tinyint DEFAULT '0' COMMENT '课程状态：0-未开始，1-进行中，2-已结束，3-已取消',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`),
  INDEX `idx_course_id` (`course_id`),
  INDEX `idx_start_time` (`start_time`),
  INDEX `idx_status` (`status`),
  INDEX `idx_time_range` (`start_time`, `end_time`),
  CONSTRAINT `fk_schedule_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程表';

-- 创建预约表
CREATE TABLE `course_booking` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '预约ID',
  `member_id` bigint NOT NULL COMMENT '会员ID',
  `course_id` bigint NOT NULL COMMENT '课程ID',
  `schedule_id` bigint NOT NULL COMMENT '课程表ID',
  `status` tinyint DEFAULT '0' COMMENT '预约状态：0-待付款，1-已预约，2-已取消，3-已完成，4-已过期',
  `pay_status` tinyint DEFAULT '0' COMMENT '支付状态：0-未支付，1-已支付',
  `amount` decimal(10,2) DEFAULT NULL COMMENT '支付金额',
  `pay_time` datetime DEFAULT NULL COMMENT '支付时间',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`),
  INDEX `idx_member_id` (`member_id`),
  INDEX `idx_course_id` (`course_id`),
  INDEX `idx_schedule_id` (`schedule_id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_pay_status` (`pay_status`),
  UNIQUE KEY `uk_member_schedule` (`member_id`, `schedule_id`, `deleted`),
  CONSTRAINT `fk_booking_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `fk_booking_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `fk_booking_schedule` FOREIGN KEY (`schedule_id`) REFERENCES `course_schedule` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='预约表';

-- 创建订单表
CREATE TABLE `order` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `order_no` varchar(32) NOT NULL COMMENT '订单号',
  `member_id` bigint NOT NULL COMMENT '会员ID',
  `type` tinyint DEFAULT '0' COMMENT '订单类型：0-课程预约，1-会员卡购买，2-商品购买',
  `amount` decimal(10,2) NOT NULL COMMENT '订单金额',
  `pay_status` tinyint DEFAULT '0' COMMENT '支付状态：0-待付款，1-已付款，2-已退款，3-已关闭',
  `pay_type` tinyint DEFAULT NULL COMMENT '支付方式：0-微信支付，1-支付宝支付，2-现金支付',
  `pay_time` datetime DEFAULT NULL COMMENT '支付时间',
  `status` tinyint DEFAULT '0' COMMENT '订单状态：0-待处理，1-已完成，2-已取消',
  `remark` varchar(255) DEFAULT NULL COMMENT '订单备注',
  `transaction_id` varchar(64) DEFAULT NULL COMMENT '微信支付交易号',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_order_no` (`order_no`),
  INDEX `idx_member_id` (`member_id`),
  INDEX `idx_type` (`type`),
  INDEX `idx_pay_status` (`pay_status`),
  INDEX `idx_status` (`status`),
  INDEX `idx_create_time` (`create_time`),
  CONSTRAINT `fk_order_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单表';

-- 创建体测数据表
CREATE TABLE `physical_test` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '体测ID',
  `member_id` bigint NOT NULL COMMENT '会员ID',
  `test_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '测试日期',
  `height` double DEFAULT NULL COMMENT '身高（cm）',
  `weight` double DEFAULT NULL COMMENT '体重（kg）',
  `bmi` double DEFAULT NULL COMMENT 'BMI指数',
  `body_fat_rate` double DEFAULT NULL COMMENT '体脂率（%）',
  `muscle_mass` double DEFAULT NULL COMMENT '肌肉量（kg）',
  `bone_mass` double DEFAULT NULL COMMENT '骨量（kg）',
  `basal_metabolism` int DEFAULT NULL COMMENT '基础代谢率（kcal）',
  `water_rate` double DEFAULT NULL COMMENT '水分率（%）',
  `trainer_id` bigint DEFAULT NULL COMMENT '体测师ID',
  `suggestion` varchar(512) DEFAULT NULL COMMENT '体测建议',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`),
  INDEX `idx_member_id` (`member_id`),
  INDEX `idx_test_date` (`test_date`),
  CONSTRAINT `fk_physical_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `fk_physical_trainer` FOREIGN KEY (`trainer_id`) REFERENCES `coach` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='体测数据表';

-- 创建会员卡表
CREATE TABLE `membership_card` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '会员卡ID',
  `name` varchar(64) NOT NULL COMMENT '会员卡名称',
  `description` varchar(512) DEFAULT NULL COMMENT '会员卡描述',
  `price` decimal(10,2) NOT NULL COMMENT '会员卡价格',
  `duration` int DEFAULT NULL COMMENT '会员卡时长（天）',
  `type` tinyint DEFAULT '0' COMMENT '会员卡类型：0-月卡，1-季卡，2-年卡，3-次卡',
  `course_count` int DEFAULT NULL COMMENT '包含课程次数（次卡专用）',
  `benefits` varchar(255) DEFAULT NULL COMMENT '会员卡权益（用逗号分隔）',
  `status` tinyint DEFAULT '1' COMMENT '会员卡状态：0-未上架，1-已上架，2-已下架',
  `sort` int DEFAULT '0' COMMENT '会员卡排序',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`),
  INDEX `idx_type` (`type`),
  INDEX `idx_status` (`status`),
  INDEX `idx_sort` (`sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会员卡表';

-- 创建会员持有会员卡表
CREATE TABLE `member_card` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `member_id` bigint NOT NULL COMMENT '会员ID',
  `card_id` bigint NOT NULL COMMENT '会员卡ID',
  `card_no` varchar(32) NOT NULL COMMENT '卡片编号',
  `activate_time` datetime DEFAULT NULL COMMENT '激活时间',
  `expire_time` datetime DEFAULT NULL COMMENT '到期时间',
  `remaining_count` int DEFAULT NULL COMMENT '剩余课程次数（次卡专用）',
  `status` tinyint DEFAULT '0' COMMENT '卡片状态：0-未激活，1-使用中，2-已过期，3-已冻结',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_card_no` (`card_no`),
  INDEX `idx_member_id` (`member_id`),
  INDEX `idx_card_id` (`card_id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_expire_time` (`expire_time`),
  CONSTRAINT `fk_member_card_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `fk_member_card_card` FOREIGN KEY (`card_id`) REFERENCES `membership_card` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会员持有会员卡表';

-- 创建营销活动表
CREATE TABLE `marketing_activity` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '活动ID',
  `name` varchar(64) NOT NULL COMMENT '活动名称',
  `description` varchar(512) DEFAULT NULL COMMENT '活动描述',
  `type` tinyint DEFAULT NULL COMMENT '活动类型：0-新客优惠，1-老客推荐，2-节日活动，3-团购优惠',
  `start_time` datetime DEFAULT NULL COMMENT '活动开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '活动结束时间',
  `status` tinyint DEFAULT '0' COMMENT '活动状态：0-未开始，1-进行中，2-已结束',
  `discount_amount` decimal(10,2) DEFAULT NULL COMMENT '优惠金额',
  `discount_rate` int DEFAULT NULL COMMENT '折扣比例（%）',
  `rules` varchar(512) DEFAULT NULL COMMENT '活动规则',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`),
  INDEX `idx_type` (`type`),
  INDEX `idx_status` (`status`),
  INDEX `idx_time_range` (`start_time`, `end_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='营销活动表';

-- 创建管理员表
CREATE TABLE `admin` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
  `username` varchar(32) NOT NULL COMMENT '用户名',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `name` varchar(16) DEFAULT NULL COMMENT '管理员姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '管理员手机',
  `role` varchar(32) DEFAULT NULL COMMENT '管理员角色',
  `status` tinyint DEFAULT '1' COMMENT '管理员状态：0-禁用，1-启用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint DEFAULT '0' COMMENT '删除标记：0-正常，1-删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`),
  INDEX `idx_role` (`role`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员表';

-- 插入初始数据
-- 插入管理员数据
INSERT INTO `admin` (`username`, `password`, `name`, `phone`, `role`, `status`) VALUES
('admin', 'e10adc3949ba59abbe56e057f20f883e', '管理员', '13800138000', 'admin', 1);

-- 插入课程分类数据
INSERT INTO `course_category` (`name`, `description`, `icon`, `parent_id`, `sort`, `status`) VALUES
('团课', '团体健身课程', 'group.png', 0, 1, 1),
('私教', '私人教练课程', 'private.png', 0, 2, 1),
('瑜伽', '瑜伽系列课程', 'yoga.png', 1, 1, 1),
('动感单车', '动感单车课程', 'spinning.png', 1, 2, 1),
('普拉提', '普拉提课程', 'pilates.png', 1, 3, 1),
('力量训练', '力量训练课程', 'strength.png', 1, 4, 1),
('有氧训练', '有氧训练课程', 'aerobic.png', 1, 5, 1);

-- 插入教练数据
INSERT INTO `coach` (`name`, `avatar`, `gender`, `phone`, `introduction`, `qualifications`, `specialties`, `level`, `status`) VALUES
('张教练', 'coach1.png', 1, '13900139001', '拥有5年健身教练经验，擅长力量训练和减脂课程', '健身教练国家职业资格证,ACE认证', '力量训练,减脂,增肌', 2, 1),
('李教练', 'coach2.png', 2, '13900139002', '专注瑜伽教学8年，擅长哈他瑜伽和流瑜伽', '瑜伽导师认证,普拉提认证', '瑜伽,普拉提,形体塑造', 3, 1),
('王教练', 'coach3.png', 1, '13900139003', '动感单车资深教练，课程充满活力和激情', '动感单车认证教练', '动感单车,有氧训练,心肺功能提升', 2, 1);

-- 插入课程数据
INSERT INTO `course` (`name`, `description`, `image`, `category_id`, `coach_id`, `duration`, `price`, `status`, `max_people`, `tags`, `type`, `difficulty`) VALUES
('基础瑜伽', '适合瑜伽初学者的入门课程，学习基本的瑜伽姿势和呼吸方法', 'yoga1.png', 3, 2, 60, 80.00, 1, 20, '瑜伽,初级,放松', 0, 0),
('动感单车', '高强度的有氧运动课程，提升心肺功能和下肢力量', 'spinning1.png', 4, 3, 45, 60.00, 1, 30, '动感单车,有氧,减脂', 0, 1),
('力量训练基础', '学习正确的力量训练姿势和方法，适合健身新手', 'strength1.png', 6, 1, 90, 200.00, 1, 1, '力量训练,私教,初级', 1, 0),
('普拉提核心训练', '专注于核心肌群的训练，改善身体姿态和稳定性', 'pilates1.png', 5, 2, 60, 100.00, 1, 15, '普拉提,核心,塑形', 0, 1),
('有氧减脂课程', '结合多种有氧运动的高效减脂课程', 'aerobic1.png', 7, 3, 60, 70.00, 1, 25, '有氧,减脂,心肺', 0, 1);

-- 插入会员卡数据
INSERT INTO `membership_card` (`name`, `description`, `price`, `duration`, `type`, `course_count`, `benefits`, `status`, `sort`) VALUES
('月卡', '一个月无限次健身', 299.00, 30, 0, NULL, '无限次团课,免费停车,储物柜使用', 1, 1),
('季卡', '三个月无限次健身', 799.00, 90, 1, NULL, '无限次团课,免费停车,储物柜使用,体测一次', 1, 2),
('年卡', '一年无限次健身', 2599.00, 365, 2, NULL, '无限次团课,免费停车,储物柜使用,体测四次,私教体验课一节', 1, 3),
('次卡', '10次健身课程', 599.00, NULL, 3, 10, '团课10次,免费停车', 1, 4);

-- 插入营销活动数据
INSERT INTO `marketing_activity` (`name`, `description`, `type`, `start_time`, `end_time`, `status`, `discount_amount`, `discount_rate`, `rules`) VALUES
('新客优惠', '新用户注册即可获得50元优惠券', 0, DATE_SUB(NOW(), INTERVAL 7 DAY), DATE_ADD(NOW(), INTERVAL 30 DAY), 1, 50.00, NULL, '新注册用户自动获得，有效期30天'),
('老客推荐', '推荐新用户注册，双方均可获得100元优惠券', 1, DATE_SUB(NOW(), INTERVAL 15 DAY), DATE_ADD(NOW(), INTERVAL 45 DAY), 1, 100.00, NULL, '推荐成功后自动发放，有效期30天'),
('双11特惠', '双11期间会员卡8折优惠', 2, DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_ADD(NOW(), INTERVAL 3 DAY), 1, NULL, 80, '双11期间购买会员卡享受8折优惠');