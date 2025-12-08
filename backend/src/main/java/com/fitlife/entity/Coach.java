package com.fitlife.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 教练表
 */
@Data
@TableName("coach")
public class Coach implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 教练ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 教练姓名
     */
    @TableField("name")
    private String name;

    /**
     * 教练头像
     */
    @TableField("avatar")
    private String avatar;

    /**
     * 教练性别：0-未知，1-男，2-女
     */
    @TableField("gender")
    private Integer gender;

    /**
     * 教练手机
     */
    @TableField("phone")
    private String phone;

    /**
     * 教练简介
     */
    @TableField("introduction")
    private String introduction;

    /**
     * 专业资质（用逗号分隔）
     */
    @TableField("qualifications")
    private String qualifications;

    /**
     * 擅长课程（用逗号分隔）
     */
    @TableField("specialties")
    private String specialties;

    /**
     * 教练等级：0-初级教练，1-中级教练，2-高级教练，3-金牌教练
     */
    @TableField("level")
    private Integer level;

    /**
     * 教练状态：0-休息中，1-工作中，2-已离职
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