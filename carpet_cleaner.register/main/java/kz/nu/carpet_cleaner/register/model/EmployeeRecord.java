package kz.nu.carpet_cleaner.register.model;

public class EmployeeRecord {
  public String id;
  public String login;
  public String name;
  public String surname;
  public Role role;

  public static EmployeeRecord of(String id, String login, String given_name, String family_name) {
    EmployeeRecord ret = new EmployeeRecord();
    ret.id = id;
    ret.login = login;
    ret.name = given_name;
    ret.surname = family_name;
    return ret;
  }
}
