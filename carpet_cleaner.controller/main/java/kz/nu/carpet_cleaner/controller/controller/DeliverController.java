package kz.nu.carpet_cleaner.controller.controller;

import kz.nu.carpet_cleaner.controller.model.OperatorOrderToSave;
import kz.nu.carpet_cleaner.controller.model.OrderShortRecord;
import kz.nu.carpet_cleaner.controller.register.OperatorRegister;
import kz.nu.carpet_cleaner.controller.register.OrderRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("deliver")
public class DeliverController {

  @Autowired
  private OrderRegister register;

  @GetMapping("orderByStatus")
  public List<OrderShortRecord> orderByStatus(@RequestParam("orderStatus") String orderStatus) {
    return register.orderByStatus(orderStatus);
  }
}
