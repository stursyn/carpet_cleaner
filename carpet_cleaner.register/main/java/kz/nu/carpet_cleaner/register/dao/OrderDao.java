package kz.nu.carpet_cleaner.register.dao;

import kz.nu.carpet_cleaner.controller.model.*;
import kz.nu.carpet_cleaner.register.model.OrderDetailData;
import org.apache.ibatis.annotations.*;
import org.springframework.security.core.parameters.P;

import java.util.Collection;
import java.util.List;

public interface OrderDao {

  @Select("SELECT nextval('s_order_number')")
  long loadSeqOrderNumber();

  @Insert("insert into clean_order(id, customerId, pickUpAddress, deliveryAddress, pickUpDate, deliveryDate, cleanStatus, totalOrderPrice, number) " +
      " values (#{toSave.id}, #{toSave.customerId}, #{toSave.pickUpAddress.id}, #{toSave.pickUpAddress.id}, #{toSave.pickUpDate}, #{toSave.deliveryDate}, #{toSave.cleanStatus}, #{toSave.totalOrderPrice}, #{toSave.number})" +
      " on conflict (id) do nothing")
  void saveOrder(@Param("toSave") OrderRecord toSave);

  @Select("select x.id, x1.surname, x1.name, x1.patronymic, x1.phoneNumber," +
      " case when 'CREATED' = x.cleanStatus then x2.displayAddress else x3.displayAddress end, " +
      " case when 'CREATED' = x.cleanStatus then x2.latitude else x3.latitude end, " +
      " case when 'CREATED' = x.cleanStatus then x2.longitude else x3.longitude end " +
      " from clean_order x" +
      " inner join customer x1 on x1.id = x.customerId " +
      " left join customer_address x2 on x2.id = x.pickUpAddress " +
      " join customer_address x3 on x3.id = x.deliveryAddress " +
      " where (x.cleanStatus = #{orderStatus} and x.pickUpDate::date  = current_date and 'CREATED' = #{orderStatus}) " +
      "     or (x.cleanStatus = #{orderStatus} and x.deliveryDate::date  = current_date and 'TO_DELIVER' = #{orderStatus})")
  List<OrderDetailData> loadOrderByStatus(@Param("orderStatus") String orderStatus);

  @Select("select x.number, x1.surname, x1.name, x1.patronymic, x1.phoneNumber as customerPhoneNumber, x2.displayAddress as pickUpAddress, x.pickUpDate" +
      " from clean_order x " +
      " inner join customer x1 on x1.id = x.customerId " +
      " left join customer_address x2 on x2.id = x.pickUpAddress " +
      " where x.id = #{orderId}")
  OrderFullRecord loadOrderFullDisplayRecord(@Param("orderId") String orderId);

  @Select("select x1.title as service, x2.title as type, x3.title as count, x4.title as material, x5.title as measurement, x.merchantWidth as width, x.merchantHeight as height, x5.code = 'measurement2' as showSize" +
      " from clean_service x " +
      " left join application_dict x1 on x1.code = x.merchantService and x1.dictType = 'MERCHANT_SERVICE'" +
      " left join application_dict x2 on x2.code = x.merchantType and x2.dictType = 'MERCHANT_TYPE'" +
      " left join application_dict x3 on x3.code = x.merchantCount and x3.dictType = 'MERCHANT_COUNT'" +
      " left join application_dict x4 on x4.code = x.merchantMaterial and x4.dictType = 'MERCHANT_MATERIAL'" +
      " left join application_dict x5 on x5.code = x.merchantMeasurement and x5.dictType = 'MERCHANT_MEASUREMENT'" +
      " where x.cleanOrderId = #{orderId}")
  List<MerchantDisplayRecord> loadMerchantDisplayRecordList(@Param("orderId") String orderId);

  @Select("select cleanStatus from clean_order where id = #{orderId}")
  OrderStatus loadStage(@Param("orderId") String orderId);

  @Update("update clean_order set cleanStatus = #{newStatus} where id = #{orderId}")
  void updateStatus(@Param("orderId") String orderId,@Param("newStatus") OrderStatus newStatus);

  @Select("select count(1) from clean_order x " +
      " where (x.cleanStatus = #{orderStatus} and x.pickUpDate::date  = current_date and 'PICKED_UP' = #{orderStatus})" +
      " or (x.cleanStatus = #{orderStatus} and x.deliveryDate::date  = current_date and 'DELIVERED' = #{orderStatus})")
  Integer loadDoneOrderForToday(@Param("orderStatus") String orderStatus);
}
