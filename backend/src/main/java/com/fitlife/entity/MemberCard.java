package com.fitlife.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 会员持有会员卡表
 */
@Data
@TableName("member_card")
public class MemberCard implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 会员ID
     */
    @TableField("member_id")
    private Long memberId;

    /**
     * 会员卡ID
     */
    @TableField("card_id")
    private Long cardId;

    /**
     * 卡片编号
     */
    @TableField("card_no")
    private String cardNo;

    /**
     * 激活时间
     */
    @TableField("activate_time")
    private LocalDateTime activateTime;

    /**
     * 到期时间
     */
    @TableField("expire_time")
    private LocalDateTime expireTime;

    /**
     * 剩余课程次数（次卡专用）
     */
    @TableField("remaining_count")
    private Integer remainingCount;

    /**
     * 卡片状态：0-未激活，1-使用中，2-已过期，3-已冻结
     */
    @TableField("status")
    private Integer status;

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