package com.fitlife.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fitlife.entity.Member;
import com.fitlife.dto.MemberDTO;
import com.fitlife.dto.MemberQueryDTO;
import com.fitlife.entity.PageResult;

/**
 * 会员服务接口
 */
public interface MemberService extends IService<Member> {

    /**
     * 根据openid获取会员信息
     * @param openid 微信openid
     * @return 会员信息
     */
    Member getMemberByOpenid(String openid);

    /**
     * 注册会员
     * @param member 会员信息
     * @return 注册后的会员信息
     */
    Member registerMember(Member member);

    /**
     * 更新会员信息
     * @param memberDTO 会员信息
     * @return 更新后的会员信息
     */
    Member updateMember(MemberDTO memberDTO);

    /**
     * 获取会员详情
     * @param memberId 会员ID
     * @return 会员详情
     */
    Member getMemberDetail(Long memberId);

    /**
     * 分页查询会员列表
     * @param queryDTO 查询条件
     * @return 分页结果
     */
    PageResult<Member> listMembers(MemberQueryDTO queryDTO);

    /**
     * 冻结会员
     * @param memberId 会员ID
     * @return 操作结果
     */
    boolean freezeMember(Long memberId);

    /**
     * 解冻会员
     * @param memberId 会员ID
     * @return 操作结果
     */
    boolean unfreezeMember(Long memberId);
}
