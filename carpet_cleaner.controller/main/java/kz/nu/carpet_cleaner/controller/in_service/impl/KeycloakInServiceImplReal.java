package kz.nu.carpet_cleaner.controller.in_service.impl;

import kz.nu.carpet_cleaner.controller.in_service.AbstractInService;
import kz.nu.carpet_cleaner.controller.in_service.KeycloakInService;
import kz.nu.carpet_cleaner.controller.model.Response;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;

public class KeycloakInServiceImplReal extends AbstractInService implements KeycloakInService {

  @Value("${keycloak.auth-server-url}")
  private String serverUrl;
  @Value("${keycloak.realm}")
  private String realm;
  @Value("${keycloak.resource}")
  private String clientId;

  public KeycloakInServiceImplReal(OkHttpClient client) {
    super(client);
  }

  @Override
  public Response<String> loginToKeycloak(String login, String password) {
    HttpUrl urlBuilder = HttpUrl.parse(serverUrl).newBuilder()
        .addPathSegment("realms")
        .addPathSegment(realm)
        .addPathSegment("protocol")
        .addPathSegment("openid-connect")
        .addPathSegment("token")
        .build();

    RequestBody formBody = new FormBody.Builder()
        .add("client_id", clientId)
        .add("username", login)
        .add("password", password)
        .add("grant_type", "password")
        .build();

    try {
      Request request = new Request.Builder()
          .url(urlBuilder)
          .post(formBody)
          .build();

      return doRequest(request);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public Response<String> userInfoKeycloak(String token) {
    HttpUrl urlBuilder = HttpUrl.parse(serverUrl).newBuilder()
        .addPathSegment("realms")
        .addPathSegment(realm)
        .addPathSegment("protocol")
        .addPathSegment("openid-connect")
        .addPathSegment("userinfo")
        .build();

    Request request = new Request.Builder()
        .url(urlBuilder)
        .addHeader("Content-Type","application/json")
        .addHeader("Authorization","Bearer " + token)
        .build();

    return doRequest(request);
  }

  @Override
  public Response<String> userRolesKeycloak(String token, String clientId) {
    HttpUrl urlBuilder = HttpUrl.parse(serverUrl).newBuilder()
        .addPathSegment("admin")
        .addPathSegment("realms")
        .addPathSegment(realm)
        .addPathSegment("clients")
        .addPathSegment(clientId)
        .addPathSegment("roles")
        .build();

    Request request = new Request.Builder()
        .url(urlBuilder)
        .addHeader("Content-Type","application/json")
        .addHeader("Authorization","Bearer " + token)
        .build();

    return doRequest(request);
  }

  @Override
  public Response<String> logoutFromKeycloak(String authorizationToken, String refreshToken) {
    HttpUrl urlBuilder = HttpUrl.parse(serverUrl).newBuilder()
        .addPathSegment("realms")
        .addPathSegment(realm)
        .addPathSegment("protocol")
        .addPathSegment("openid-connect")
        .addPathSegment("logout")
        .build();

    RequestBody formBody = new FormBody.Builder()
        .add("client_id", clientId)
        .add("refresh_token", refreshToken)
        .build();

    Request request = new Request.Builder()
        .url(urlBuilder)
        .addHeader("Authorization",authorizationToken)
        .post(formBody)
        .build();

    return doRequest(request);
  }
}
