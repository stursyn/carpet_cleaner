package kz.nu.carpet_cleaner.controller.model;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static kz.nu.carpet_cleaner.controller.util.ServerUtil.nvl;

public class OrderFullRecord {
  public String id;
  public String number;
  public String name;
  public String surname;
  public String patronymic;
  public String customerFio;
  public String customerPhoneNumber;
  public String pickUpAddress;
  public String pickUpDateDisplay;
  public Date pickUpDate;
  public List<MerchantDisplayRecord> merchantList = new ArrayList<>();

  public void formatData() {
    this.customerFio = nvl(this.surname, false) + nvl(this.name, false) + nvl(this.patronymic,true);
    if(this.pickUpDate!=null) this.pickUpDateDisplay = new SimpleDateFormat("dd.MM.yyyy").format(this.pickUpDate);
  }
}
