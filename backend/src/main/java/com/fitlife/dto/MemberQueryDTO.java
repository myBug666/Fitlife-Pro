package com.fitlife.dto;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 会员查询DTO
 */
@Data
public class MemberQueryDTO {
    /**
     * 页码
     */
    private Integer pageNum = 1;

    /**
     * 每页数量
     */
    private Integer pageSize = 10;

    /**
     * 会员昵称
     */
    private String nickname;

    /**
     * 手机号码
     */
    private String phone;

    /**
     * 会员等级：0-普通会员，1-银卡会员，2-金卡会员，3-钻石会员
     */
    private Integer level;

    /**
     * 会员状态：0-未激活，1-正常，2-冻结
     */
    private Integer status;

    /**
     * 注册开始时间
     */
    private LocalDateTime startDate;

    /**
     * 注册结束时间
     */
    private LocalDateTime endDate;
}
