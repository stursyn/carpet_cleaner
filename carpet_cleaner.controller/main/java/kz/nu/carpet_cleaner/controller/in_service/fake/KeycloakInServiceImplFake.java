package kz.nu.carpet_cleaner.controller.in_service.fake;

import kz.nu.carpet_cleaner.controller.in_service.KeycloakInService;
import kz.nu.carpet_cleaner.controller.model.Response;

public class KeycloakInServiceImplFake implements KeycloakInService {
  @Override
  public Response<String> loginToKeycloak(String login, String password) {
    return null;
  }

  @Override
  public Response<String> userInfoKeycloak(String token) {
    return null;
  }

  @Override
  public Response<String> userRolesKeycloak(String token, String clientId) {
    return null;
  }

  @Override
  public Response<String> logoutFromKeycloak(String authorizationToken, String refreshToken) {
    return null;
  }
}
