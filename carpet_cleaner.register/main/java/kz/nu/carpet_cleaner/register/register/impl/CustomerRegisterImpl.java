package kz.nu.carpet_cleaner.register.register.impl;

import kz.greetgo.util.RND;
import kz.nu.carpet_cleaner.controller.model.CustomerRecord;
import kz.nu.carpet_cleaner.controller.register.CustomerRegister;
import kz.nu.carpet_cleaner.register.dao.CustomerDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomerRegisterImpl implements CustomerRegister {

  @Autowired
  private CustomerDao customerDao;

  @Override
  public List<CustomerRecord> searchByPhoneNumber(String phoneNumber) {
    List<CustomerRecord> customerRecords = customerDao.loadCustomersByPhoneNumber(phoneNumber);
    customerRecords.forEach(customerRecord -> customerRecord.generateFIO());
    return customerRecords;
  }

  @Override
  public CustomerRecord getCustomerDetail(String id) {
    return customerDao.loadCustomer(id);
  }

  @Override
  public String saveCustomer(CustomerRecord customer) {
    if(customer.id==null) customer.id = RND.strEng(30);
    customerDao.upsertCustomer(customer);
    return customer.id;
  }
}
