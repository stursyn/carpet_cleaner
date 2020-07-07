package kz.nu.carpet_cleaner.controller.util;

public class ServerUtil {
  public static String nvl(String value, boolean last) {
    if(value == null) return "";
    return value + (last?"":" ");
  }
}
