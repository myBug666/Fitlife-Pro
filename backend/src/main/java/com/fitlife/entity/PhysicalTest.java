package com.fitlife.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 体测数据表
 */
@Data
@TableName("physical_test")
public class PhysicalTest implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 体测ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 会员ID
     */
    @TableField("member_id")
    private Long memberId;

    /**
     * 测试日期
     */
    @TableField("test_date")
    private LocalDateTime testDate;

    /**
     * 身高（cm）
     */
    @TableField("height")
    private Double height;

    /**
     * 体重（kg）
     */
    @TableField("weight")
    private Double weight;

    /**
     * BMI指数
     */
    @TableField("bmi")
    private Double bmi;

    /**
     * 体脂率（%）
     */
    @TableField("body_fat_rate")
    private Double bodyFatRate;

    /**
     * 肌肉量（kg）
     */
    @TableField("muscle_mass")
    private Double muscleMass;

    /**
     * 骨量（kg）
     */
    @TableField("bone_mass")
    private Double boneMass;

    /**
     * 基础代谢率（kcal）
     */
    @TableField("basal_metabolism")
    private Integer basalMetabolism;

    /**
     * 水分率（%）
     */
    @TableField("water_rate")
    private Double waterRate;

    /**
     * 体测师ID
     */
    @TableField("trainer_id")
    private Long trainerId;

    /**
     * 体测建议
     */
    @TableField("suggestion")
    private String suggestion;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    @TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    /**
     * 删除标记：0-正常，1-删除
     */
    @TableLogic
    @TableField("deleted")
    private Integer deleted;
}