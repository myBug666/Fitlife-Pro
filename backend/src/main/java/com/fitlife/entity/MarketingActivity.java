package com.fitlife.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 营销活动表
 */
@Data
@TableName("marketing_activity")
public class MarketingActivity implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 活动ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 活动名称
     */
    @TableField("name")
    private String name;

    /**
     * 活动描述
     */
    @TableField("description")
    private String description;

    /**
     * 活动类型：0-新客优惠，1-老客推荐，2-节日活动，3-团购优惠
     */
    @TableField("type")
    private Integer type;

    /**
     * 活动开始时间
     */
    @TableField("start_time")
    private LocalDateTime startTime;

    /**
     * 活动结束时间
     */
    @TableField("end_time")
    private LocalDateTime endTime;

    /**
     * 活动状态：0-未开始，1-进行中，2-已结束
     */
    @TableField("status")
    private Integer status;

    /**
     * 优惠金额
     */
    @TableField("discount_amount")
    private BigDecimal discountAmount;

    /**
     * 折扣比例（%）
     */
    @TableField("discount_rate")
    private Integer discountRate;

    /**
     * 活动规则
     */
    @TableField("rules")
    private String rules;

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