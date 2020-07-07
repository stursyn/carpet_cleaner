package kz.nu.carpet_cleaner.register.dao;

import kz.nu.carpet_cleaner.controller.model.AddressRecord;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

public interface AddressDao {
  @Insert("insert into customer_address(id, customerId, displayAddress, longitude, latitude) " +
      " values (#{address.id}, #{address.customerId}, #{address.displayAddress}, #{address.longitude}, #{address.latitude})" +
      " on conflict(id) do update set " +
      " customerId = #{address.customerId}, displayAddress = #{address.displayAddress}, longitude = #{address.longitude}, latitude = #{address.latitude}")
  void saveAddress(@Param("address") AddressRecord addressRecord);

}
