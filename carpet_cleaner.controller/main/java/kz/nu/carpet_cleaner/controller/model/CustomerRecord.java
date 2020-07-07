package kz.nu.carpet_cleaner.controller.model;

import kz.nu.carpet_cleaner.controller.util.ServerUtil;

import static kz.nu.carpet_cleaner.controller.util.ServerUtil.nvl;

public class CustomerRecord {
  public String id;
  public String surname;
  public String name;
  public String patronymic;
  public String fio;
  public String phoneNumber;

  public void generateFIO() {
    this.fio = nvl(this.surname, false) + nvl(this.name, false) + nvl(this.patronymic,true);
  }
}
