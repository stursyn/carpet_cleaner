package kz.nu.carpet_cleaner.controller.register;

import kz.nu.carpet_cleaner.controller.model.OrderFullRecord;
import kz.nu.carpet_cleaner.controller.model.OrderRecord;
import kz.nu.carpet_cleaner.controller.model.OrderShortRecord;

import java.util.List;

public interface OrderRegister {

  void saveOrder(String customerId, OrderRecord order);

  String getNextOrderNumber();

  List<OrderShortRecord> orderByStatus(String orderStatus);

  OrderFullRecord orderDetail(String orderId);

  void orderMoveStage(String orderId);

  Integer doneOrderCount(String orderStatus);

  void cancelOrder(String orderId);

  Double getPrice(String service, String type, String material, String measurement);

}
