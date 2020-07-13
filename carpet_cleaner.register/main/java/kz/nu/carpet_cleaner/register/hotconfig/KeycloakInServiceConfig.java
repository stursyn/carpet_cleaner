package kz.nu.carpet_cleaner.register.hotconfig;


import kz.greetgo.conf.hot.DefaultBoolValue;
import kz.greetgo.conf.hot.DefaultStrValue;
import kz.greetgo.conf.hot.Description;
import kz.greetgo.conf.hot.FirstReadEnv;
import org.springframework.beans.factory.annotation.Value;

@Description("Параметры доступа к БД (используется только БД Postgresql)")
public interface KeycloakInServiceConfig {

  @DefaultBoolValue(false)
  boolean useFake();
}
