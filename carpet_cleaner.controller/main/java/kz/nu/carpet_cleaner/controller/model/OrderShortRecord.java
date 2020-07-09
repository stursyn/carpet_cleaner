package kz.nu.carpet_cleaner.controller.model;

import java.math.BigDecimal;

public class OrderShortRecord {
  public String id;
  public String displayTitle;
  public String description;
  public BigDecimal latitude;
  public BigDecimal longitude;

  public static OrderShortRecord of(String id, String displayTitle, String description, BigDecimal latitude, BigDecimal longitude) {
    OrderShortRecord ret = new OrderShortRecord();
    ret.id = id;
    ret.displayTitle = displayTitle;
    ret.description = description;
    ret.latitude = latitude;
    ret.longitude = longitude;
    return ret;
  }
}
