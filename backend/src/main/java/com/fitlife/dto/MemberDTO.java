package com.fitlife.dto;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 会员DTO
 */
@Data
public class MemberDTO {
    /**
     * 会员ID
     */
    private Long id;

    /**
     * 真实姓名
     */
    private String realName;

    /**
     * 手机号码
     */
    private String phone;

    /**
     * 性别：0-未知，1-男，2-女
     */
    private Integer gender;

    /**
     * 出生日期
     */
    private LocalDateTime birthDate;

    /**
     * 身高（cm）
     */
    private Double height;

    /**
     * 体重（kg）
     */
    private Double weight;

    /**
     * 会员等级：0-普通会员，1-银卡会员，2-金卡会员，3-钻石会员
     */
    private Integer level;

    /**
     * 会员状态：0-未激活，1-正常，2-冻结
     */
    private Integer status;
}
