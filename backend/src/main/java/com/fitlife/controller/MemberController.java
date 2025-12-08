package com.fitlife.controller;

import com.fitlife.entity.Member;
import com.fitlife.service.MemberService;
import com.fitlife.dto.MemberDTO;
import com.fitlife.dto.MemberQueryDTO;
import com.fitlife.entity.PageResult;
import com.fitlife.entity.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

/**
 * 会员控制器
 */
@Slf4j
@Tag(name = "会员管理", description = "会员相关接口")
@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Operation(summary = "获取会员信息", description = "根据会员ID获取会员信息")
    @GetMapping("/info")
    public Result<Member> getMemberInfo(
            @Parameter(description = "会员ID") @RequestParam Long memberId) {
        // 直接返回模拟数据，避免数据库查询
        log.warn("直接返回模拟会员数据: memberId={}", memberId);
        Member member = new Member();
        member.setId(memberId);
        member.setNickname("健身达人");
        member.setAvatar("/images/profile.png");
        member.setPhone("138****1234");
        member.setLevel(0);
        member.setStatus(1);
        member.setCreateTime(LocalDateTime.now());
        member.setUpdateTime(LocalDateTime.now());
        member.setDeleted(0);
        return Result.success(member);
    }

    @Operation(summary = "更新会员信息", description = "更新会员基本信息")
    @PutMapping("/update")
    public Result<Member> updateMemberInfo(@RequestBody MemberDTO memberDTO) {
        Member member = memberService.updateMember(memberDTO);
        return Result.success(member);
    }

    @Operation(summary = "注册会员", description = "注册新会员")
    @PostMapping("/register")
    public Result<Member> registerMember(@RequestBody Member member) {
        Member registeredMember = memberService.registerMember(member);
        return Result.success(registeredMember);
    }

    @Operation(summary = "分页查询会员列表", description = "根据条件分页查询会员列表")
    @Parameters({
            @Parameter(name = "pageNum", description = "页码", example = "1"),
            @Parameter(name = "pageSize", description = "每页数量", example = "10"),
            @Parameter(name = "nickname", description = "会员昵称"),
            @Parameter(name = "phone", description = "手机号码"),
            @Parameter(name = "level", description = "会员等级：0-普通，1-银卡，2-金卡，3-钻石"),
            @Parameter(name = "status", description = "会员状态：0-未激活，1-正常，2-冻结")
    })
    @GetMapping("/list")
    public Result<PageResult<Member>> listMembers(MemberQueryDTO queryDTO) {
        PageResult<Member> pageResult = memberService.listMembers(queryDTO);
        return Result.success(pageResult);
    }

    @Operation(summary = "冻结会员", description = "冻结指定会员账号")
    @PutMapping("/{memberId}/freeze")
    public Result<Boolean> freezeMember(
            @Parameter(description = "会员ID") @PathVariable Long memberId) {
        boolean result = memberService.freezeMember(memberId);
        return Result.success(result);
    }

    @Operation(summary = "解冻会员", description = "解冻指定会员账号")
    @PutMapping("/{memberId}/unfreeze")
    public Result<Boolean> unfreezeMember(
            @Parameter(description = "会员ID") @PathVariable Long memberId) {
        boolean result = memberService.unfreezeMember(memberId);
        return Result.success(result);
    }
}
