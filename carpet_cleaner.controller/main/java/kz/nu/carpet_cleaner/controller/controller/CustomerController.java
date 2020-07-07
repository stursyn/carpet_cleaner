package kz.nu.carpet_cleaner.controller.controller;

import kz.nu.carpet_cleaner.controller.model.CustomerRecord;
import kz.nu.carpet_cleaner.controller.model.OrderRecord;
import kz.nu.carpet_cleaner.controller.register.CustomerRegister;
import kz.nu.carpet_cleaner.controller.register.OrderRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("customer")
public class CustomerController {

  @Autowired
  private CustomerRegister register;

  @GetMapping("searchByPhone")
  public List<CustomerRecord> searchByPhone(@RequestParam("phoneNumber") String phoneNumber) {
    return register.searchByPhoneNumber(phoneNumber);
  }

  @GetMapping("detail")
  public CustomerRecord customerDetail(@RequestParam("customerId") String id) {
    return register.getCustomerDetail(id);
  }

}
