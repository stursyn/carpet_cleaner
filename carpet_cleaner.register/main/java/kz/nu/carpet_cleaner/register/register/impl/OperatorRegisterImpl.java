package kz.nu.carpet_cleaner.register.register.impl;

import kz.nu.carpet_cleaner.controller.model.CustomerRecord;
import kz.nu.carpet_cleaner.controller.model.OperatorOrderToSave;
import kz.nu.carpet_cleaner.controller.register.CustomerRegister;
import kz.nu.carpet_cleaner.controller.register.OperatorRegister;
import kz.nu.carpet_cleaner.controller.register.OrderRegister;
import kz.nu.carpet_cleaner.register.dao.CustomerDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OperatorRegisterImpl implements OperatorRegister {

  @Autowired
  private CustomerRegister customerRegister;

  @Autowired
  private OrderRegister orderRegister;

  @Override
  public void saveOrder(OperatorOrderToSave toSave) {
    String customerId = customerRegister.saveCustomer(toSave.customer);
    orderRegister.saveOrder(customerId, toSave.order);
  }
}
