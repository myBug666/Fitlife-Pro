package com.fitlife;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration;
import org.redisson.spring.starter.RedissonAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * 健身会员管理小程序后端主类
 */
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class, ManagementWebSecurityAutoConfiguration.class, RedisAutoConfiguration.class, RedissonAutoConfiguration.class})
@MapperScan("com.fitlife.mapper")
@EnableScheduling
public class FitLifeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(FitLifeBackendApplication.class, args);
    }

}