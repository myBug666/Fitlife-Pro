package com.fitlife.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 订单表
 */
@Data
@TableName("order")
public class Order implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 订单ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 订单号
     */
    @TableField("order_no")
    private String orderNo;

    /**
     * 会员ID
     */
    @TableField("member_id")
    private Long memberId;

    /**
     * 订单类型：0-课程预约，1-会员卡购买，2-商品购买
     */
    @TableField("type")
    private Integer type;

    /**
     * 订单金额
     */
    @TableField("amount")
    private BigDecimal amount;

    /**
     * 支付状态：0-待付款，1-已付款，2-已退款，3-已关闭
     */
    @TableField("pay_status")
    private Integer payStatus;

    /**
     * 支付方式：0-微信支付，1-支付宝支付，2-现金支付
     */
    @TableField("pay_type")
    private Integer payType;

    /**
     * 支付时间
     */
    @TableField("pay_time")
    private LocalDateTime payTime;

    /**
     * 订单状态：0-待处理，1-已完成，2-已取消
     */
    @TableField("status")
    private Integer status;

    /**
     * 订单备注
     */
    @TableField("remark")
    private String remark;

    /**
     * 微信支付交易号
     */
    @TableField("transaction_id")
    private String transactionId;

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