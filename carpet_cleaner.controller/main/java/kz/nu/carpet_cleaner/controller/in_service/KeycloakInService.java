package kz.nu.carpet_cleaner.controller.in_service;

import kz.nu.carpet_cleaner.controller.model.ApiError;
import kz.nu.carpet_cleaner.controller.model.Response;

public interface KeycloakInService {
  Response<String> loginToKeycloak(String login, String password);

  Response<String> userInfoKeycloak(String token);

  Response<String> userRolesKeycloak(String token, String clientId);

  Response<String> logoutFromKeycloak(String authorizationToken, String refreshToken);
}
