package kz.nu.carpet_cleaner.controller.register;

import kz.nu.carpet_cleaner.controller.model.CustomerRecord;

import java.util.List;

public interface CustomerRegister {

  List<CustomerRecord> searchByPhoneNumber(String phoneNumber);

  CustomerRecord getCustomerDetail(String id);

  String saveCustomer(CustomerRecord customer);
}
