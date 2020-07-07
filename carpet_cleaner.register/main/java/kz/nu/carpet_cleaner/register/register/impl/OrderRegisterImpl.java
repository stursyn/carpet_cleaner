package kz.nu.carpet_cleaner.register.register.impl;

import kz.greetgo.util.RND;
import kz.nu.carpet_cleaner.controller.model.AddressRecord;
import kz.nu.carpet_cleaner.controller.model.OrderRecord;
import kz.nu.carpet_cleaner.controller.model.OrderShortRecord;
import kz.nu.carpet_cleaner.controller.model.OrderStatus;
import kz.nu.carpet_cleaner.controller.register.OrderRegister;
import kz.nu.carpet_cleaner.controller.util.DateUtil;
import kz.nu.carpet_cleaner.controller.util.ServerUtil;
import kz.nu.carpet_cleaner.register.dao.AddressDao;
import kz.nu.carpet_cleaner.register.dao.MerchantDao;
import kz.nu.carpet_cleaner.register.dao.OrderDao;
import kz.nu.carpet_cleaner.register.model.OrderDetailData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static kz.nu.carpet_cleaner.controller.util.ServerUtil.*;

@Component
public class OrderRegisterImpl implements OrderRegister {

  @Autowired
  private OrderDao orderDao;

  @Autowired
  private AddressDao addressDao;

  @Autowired
  private MerchantDao merchantDao;

  @Override
  public void saveOrder(String customerId, OrderRecord order) {
    if(order.id==null) order.id = RND.strEng(30);
    order.customerId = customerId;
    order.cleanStatus = OrderStatus.CREATED;
    if(order.pickUpDate!=null) order.deliveryDate = DateUtil.addDays(order.pickUpDate, 2);

    AddressRecord saveAddress = order.pickUpAddress;
    if(saveAddress!=null) {
      saveAddress.id = RND.strEng(30);
      saveAddress.customerId = customerId;
      addressDao.saveAddress(saveAddress);
    }

    orderDao.saveOrder(order);

    order.merchantList.forEach(merchantRecord -> {
      if(merchantRecord.id == null) merchantRecord.id = RND.strEng(30);
      merchantRecord.cleanOrderId = order.id;
      merchantDao.saveCleanService(merchantRecord);
    });
  }

  @Override
  public String getNextOrderNumber() {
    return RND.strFrom(5, RND.ENG.toCharArray()) + orderDao.loadSeqOrderNumber();
  }

  @Override
  public List<OrderShortRecord> orderByStatus(String orderStatus) {
    List<OrderShortRecord> ret = new ArrayList<>();
    List<OrderDetailData> orderDetailData = orderDao.loadOrderByStatus(orderStatus);
    orderDetailData.forEach(orderData ->
      ret.add(OrderShortRecord.of( nvl(orderData.merchantTypeTitle, true) + " - " + nvl(orderData.surname, false) + nvl(orderData.name, false)
          + nvl(orderData.patronymic, true), "Телефон: " + orderData.phoneNumber + " \n Адрес: " + orderData.displayAddress,
          orderData.latitude, orderData.longitude)));
    return ret;
  }
}
