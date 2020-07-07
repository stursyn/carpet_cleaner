package kz.nu.carpet_cleaner.register.dao;

import kz.nu.carpet_cleaner.controller.model.OrderRecord;
import kz.nu.carpet_cleaner.controller.model.OrderShortRecord;
import kz.nu.carpet_cleaner.register.model.OrderDetailData;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface OrderDao {

  @Select("SELECT nextval('s_order_number')")
  long loadSeqOrderNumber();

  @Insert("insert into clean_order(id, customerId, pickUpAddress, deliveryAddress, pickUpDate, deliveryDate, cleanStatus, totalOrderPrice, number) " +
      " values (#{toSave.id}, #{toSave.customerId}, #{toSave.pickUpAddress.id}, #{toSave.pickUpAddress.id}, #{toSave.pickUpDate}, #{toSave.deliveryDate}, #{toSave.cleanStatus}, #{toSave.totalOrderPrice}, #{toSave.number})" +
      " on conflict (id) do nothing")
  void saveOrder(@Param("toSave") OrderRecord toSave);

  @Select("select x1.surname, x1.name, x1.patronymic, x1.phoneNumber, x5.title as merchantTypeTitle, " +
      " case when 'CREATED' = x.cleanStatus then x2.displayAddress else x3.displayAddress end, " +
      " case when 'CREATED' = x.cleanStatus then x2.latitude else x3.latitude end, " +
      " case when 'CREATED' = x.cleanStatus then x2.longitude else x3.longitude end " +
      " from clean_order x" +
      " inner join customer x1 on x1.id = x.customerId " +
      " inner join customer_address x2 on x2.id = x.pickUpAddress " +
      " inner join customer_address x3 on x3.id = x.deliveryAddress " +
      " inner join clean_service x4 on x4.cleanOrderId = x.id " +
      " inner join application_dict x5 on x5.code = x4.merchantType and x5.dictType = 'MERCHANT_TYPE' " +
      " where (x.cleanStatus = #{orderStatus} and x.pickUpDate::date  = current_date and 'CREATED' = #{orderStatus}) " +
      "     or (x.cleanStatus = #{orderStatus} and x.deliveryDate::date  = current_date and 'TO_DELIVER' = #{orderStatus})")
  List<OrderDetailData> loadOrderByStatus(@Param("orderStatus") String orderStatus);
}
