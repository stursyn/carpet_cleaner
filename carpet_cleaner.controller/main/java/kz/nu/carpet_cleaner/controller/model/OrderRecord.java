package kz.nu.carpet_cleaner.controller.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class OrderRecord {
  public String id;
  public String customerId;
  public String number;
  public AddressRecord pickUpAddress;
  public List<MerchantRecord> merchantList = new ArrayList<>();
  public Date pickUpDate;
  public Date deliveryDate;
  public OrderStatus cleanStatus;
  public BigDecimal totalOrderPrice;
}
