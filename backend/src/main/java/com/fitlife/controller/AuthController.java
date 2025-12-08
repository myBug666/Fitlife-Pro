package com.fitlife.controller;

import com.fitlife.entity.Member;
import com.fitlife.entity.Result;
import com.fitlife.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 认证控制器
 */
@Tag(name = "认证管理", description = "登录相关接口")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private MemberService memberService;

    /**
     * 微信登录
     * @param code 微信登录授权码
     * @return 会员信息
     */
    @Operation(summary = "微信登录", description = "通过微信授权码登录")
    @PostMapping("/login")
    public Result<Member> login(
            @Parameter(description = "微信登录授权码") @RequestParam String code) {
        // 注意：这里应该调用微信API获取openid，但由于是测试环境，我们使用模拟openid
        // 在实际生产环境中，应该使用微信提供的API来获取openid
        String openid = "mock_openid_" + code.substring(0, 8);
        
        // 创建会员对象（如果不存在会自动注册）
        Member member = new Member();
        member.setOpenid(openid);
        member.setNickname("测试用户");
        member.setAvatar("https://example.com/avatar.jpg");
        member.setGender(0);
        
        // 注册或获取现有会员
        member = memberService.registerMember(member);
        
        return Result.success(member);
    }
}
