package kz.nu.carpet_cleaner.controller.exception;

import kz.nu.carpet_cleaner.controller.model.Response;

public class KeycloakAuthorizationApiException extends RuntimeException {


  public final Response response;

  public KeycloakAuthorizationApiException(Response response) {
    this.response = response;
  }

}
