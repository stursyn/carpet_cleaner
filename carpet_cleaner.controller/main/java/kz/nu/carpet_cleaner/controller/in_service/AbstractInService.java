package kz.nu.carpet_cleaner.controller.in_service;

import kz.nu.carpet_cleaner.controller.model.Response;
import kz.nu.carpet_cleaner.controller.util.ExceptionUtils;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;

public abstract class AbstractInService {

  private final OkHttpClient client;

  public AbstractInService(OkHttpClient client) {
    this.client = client;
  }

  protected Response<String> doRequest(Request request) {
    Response<String> response = new Response<String>();
    try {
      response.url = request.url().toString();
      try (okhttp3.Response resp = client.newCall(request).execute()) {
        response.body = resp.body().string();
        response.isOk = resp.isSuccessful();
        response.status = resp.code();
        return response;
      }
    } catch (Exception e) {
      response.isOk = false;
      response.body = ExceptionUtils.stackTraceToString(e);
      response.status = 500;
      return response;
    }
  }

  protected MediaType JSON
      = MediaType.parse("application/json; charset=utf-8");

  protected MediaType X_WWW_FORM_URLENCODED
      = MediaType.parse("application/x-www-form-urlencoded");

}
