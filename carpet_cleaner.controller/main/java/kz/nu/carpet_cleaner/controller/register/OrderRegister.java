package kz.nu.carpet_cleaner.controller.register;

import kz.nu.carpet_cleaner.controller.model.OrderRecord;
import kz.nu.carpet_cleaner.controller.model.OrderShortRecord;

import java.util.List;

public interface OrderRegister {

  void saveOrder(String customerId, OrderRecord order);

  String getNextOrderNumber();

  List<OrderShortRecord> orderByStatus(String orderStatus);
}
