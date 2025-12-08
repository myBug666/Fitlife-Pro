package com.fitlife.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Swagger配置类
 */
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("健身会员管理小程序API文档")
                        .version("1.0.0")
                        .description("健身会员管理小程序后端API接口文档，提供完整的会员管理、课程预约、体测数据、支付订单、营销裂变等功能")
                        .contact(new Contact()
                                .name("FitLife团队")
                                .email("fitlife@example.com")
                                .url("http://www.fitlife.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://www.apache.org/licenses/LICENSE-2.0")));
    }
}
