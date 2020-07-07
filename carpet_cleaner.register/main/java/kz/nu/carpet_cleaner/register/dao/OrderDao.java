package kz.nu.carpet_cleaner.register.dao;

import kz.nu.carpet_cleaner.controller.model.OrderRecord;
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
}
