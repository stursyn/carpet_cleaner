package kz.nu.carpet_cleaner.register.dao;

import kz.nu.carpet_cleaner.controller.model.MerchantRecord;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

public interface MerchantDao {
  @Insert("insert into clean_service(id, cleanOrderId, merchantCount, merchantType, merchantMaterial, merchantMeasurement, serviceType, servicePrice) " +
      " values (#{merchant.id}, #{merchant.cleanOrderId}, #{merchant.merchantCount}, #{merchant.merchantType}, #{merchant.merchantMaterial}, #{merchant.merchantMeasurement}, #{merchant.serviceType}, #{merchant.servicePrice})" +
      " on conflict(id) do nothing")
  void saveCleanService(@Param("merchant") MerchantRecord merchantRecord);
}