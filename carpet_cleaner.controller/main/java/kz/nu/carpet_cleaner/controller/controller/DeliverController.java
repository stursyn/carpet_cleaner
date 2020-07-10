package kz.nu.carpet_cleaner.controller.controller;

import kz.nu.carpet_cleaner.controller.model.OperatorOrderToSave;
import kz.nu.carpet_cleaner.controller.model.OrderFullRecord;
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

  @Autowired
  private OperatorRegister operatorRegister;

  @GetMapping("orderByStatus")
  public List<OrderShortRecord> orderByStatus(@RequestParam("orderStatus") String orderStatus) {
    return register.orderByStatus(orderStatus);
  }

  @GetMapping("orderDetail")
  public OrderFullRecord orderDetail(@RequestParam("orderId") String orderId) {
    return register.orderDetail(orderId);
  }

  @GetMapping("orderMoveStage")
  public void orderMoveStage(@RequestParam("orderId") String orderId) {
    register.orderMoveStage(orderId);
    return;
  }

  @GetMapping("cancelOrder")
  public void cancelOrder(@RequestParam("orderId") String orderId) {
    register.cancelOrder(orderId);
    return;
  }

  @GetMapping("doneOrderCount")
  public Integer doneOrderCount(@RequestParam("orderStatus") String orderStatus) {
    return register.doneOrderCount(orderStatus);
  }

  @PostMapping("saveOrder")
  public void saveOrder(@RequestBody OperatorOrderToSave toSave) {
    operatorRegister.saveOrder(toSave);
    return;
  }
}
