package kz.nu.carpet_cleaner.register.configurations.beans.all.in_service_factories;


import kz.nu.carpet_cleaner.controller.in_service.KeycloakInService;
import kz.nu.carpet_cleaner.controller.in_service.fake.KeycloakInServiceImplFake;
import kz.nu.carpet_cleaner.controller.in_service.impl.KeycloakInServiceImplReal;
import kz.nu.carpet_cleaner.register.hotconfig.KeycloakInServiceConfig;
import okhttp3.OkHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class KeycloakInServiceFactory {

  @Autowired
  private KeycloakInServiceConfig config;
  @Autowired
  private OkHttpClient okHttpClient;

  @Bean
  @Scope(BeanDefinition.SCOPE_PROTOTYPE)
  public KeycloakInService keycloakInService() {
    if (config.useFake()) {
      return new KeycloakInServiceImplFake();
    } else {
      return new KeycloakInServiceImplReal(okHttpClient);
    }
  }

}
