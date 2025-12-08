package com.fitlife.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 会员卡表
 */
@Data
@TableName("membership_card")
public class MembershipCard implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 会员卡ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 会员卡名称
     */
    @TableField("name")
    private String name;

    /**
     * 会员卡描述
     */
    @TableField("description")
    private String description;

    /**
     * 会员卡价格
     */
    @TableField("price")
    private BigDecimal price;

    /**
     * 会员卡时长（天）
     */
    @TableField("duration")
    private Integer duration;

    /**
     * 会员卡类型：0-月卡，1-季卡，2-年卡，3-次卡
     */
    @TableField("type")
    private Integer type;

    /**
     * 包含课程次数（次卡专用）
     */
    @TableField("course_count")
    private Integer courseCount;

    /**
     * 会员卡权益（用逗号分隔）
     */
    @TableField("benefits")
    private String benefits;

    /**
     * 会员卡状态：0-未上架，1-已上架，2-已下架
     */
    @TableField("status")
    private Integer status;

    /**
     * 会员卡排序
     */
    @TableField("sort")
    private Integer sort;

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