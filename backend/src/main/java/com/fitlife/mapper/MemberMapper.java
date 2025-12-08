package com.fitlife.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fitlife.entity.Member;
import org.apache.ibatis.annotations.Mapper;

/**
 * 会员Mapper接口
 */
@Mapper
public interface MemberMapper extends BaseMapper<Member> {

    /**
     * 根据openid查询会员
     * @param openid 微信openid
     * @return 会员信息
     */
    Member selectByOpenid(String openid);
}
