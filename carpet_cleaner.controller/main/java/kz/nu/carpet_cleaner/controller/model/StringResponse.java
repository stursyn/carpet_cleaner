package kz.nu.carpet_cleaner.controller.model;

public class StringResponse {
  public String value;

  public static StringResponse of(String value) {
    StringResponse ret = new StringResponse();
    ret.value = value;
    return ret;
  }
}
