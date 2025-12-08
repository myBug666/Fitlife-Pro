package com.fitlife.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 会员表
 */
@Data
@TableName("member")
public class Member implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 会员ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 微信openid
     */
    @TableField("openid")
    private String openid;

    /**
     * 会员昵称
     */
    @TableField("nickname")
    private String nickname;

    /**
     * 会员头像
     */
    @TableField("avatar")
    private String avatar;

    /**
     * 真实姓名
     */
    @TableField("real_name")
    private String realName;

    /**
     * 手机号码
     */
    @TableField("phone")
    private String phone;

    /**
     * 性别：0-未知，1-男，2-女
     */
    @TableField("gender")
    private Integer gender;

    /**
     * 出生日期
     */
    @TableField("birth_date")
    private LocalDateTime birthDate;

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
     * 会员等级：0-普通会员，1-银卡会员，2-金卡会员，3-钻石会员
     */
    @TableField("level")
    private Integer level;

    /**
     * 会员状态：0-未激活，1-正常，2-冻结
     */
    @TableField("status")
    private Integer status;

    /**
     * 注册时间
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