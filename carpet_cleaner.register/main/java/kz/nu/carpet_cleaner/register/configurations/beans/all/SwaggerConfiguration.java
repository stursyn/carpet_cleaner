package kz.nu.carpet_cleaner.register.configurations.beans.all;

import kz.nu.carpet_cleaner.controller.controller.BeanScannerController;
import kz.nu.carpet_cleaner.register.util.ApplicationInfo;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration implements WebMvcConfigurer {

  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
        .select()
        .apis(RequestHandlerSelectors.basePackage(BeanScannerController.class.getPackage().getName()))
        .paths(PathSelectors.any())
        .build()
        .apiInfo(apiInfo());
  }


  private ApiInfo apiInfo() {
    return new ApiInfo("Service Bus REST API", "REST API for AIX Service Bus",
                       ApplicationInfo.appVersion(),
                       "",
                       null, "",
                       "", Collections.emptyList());
  }


}
