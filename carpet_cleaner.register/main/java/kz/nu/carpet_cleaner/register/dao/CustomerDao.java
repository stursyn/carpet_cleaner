package kz.nu.carpet_cleaner.register.dao;

import kz.nu.carpet_cleaner.controller.model.CustomerRecord;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface CustomerDao {

  @Select("select * from customer where phoneNUmber = #{phoneNumber}")
  List<CustomerRecord> loadCustomersByPhoneNumber(@Param("phoneNumber") String phoneNumber);

  @Select("select * from customer where id = #{customerId}")
  CustomerRecord loadCustomer(@Param("customerId") String customerId);

  @Insert("insert into customer(id, name, surname, patronymic, phoneNumber) " +
      " values (#{customer.id}, #{customer.name}, #{customer.surname}, #{customer.patronymic}, #{customer.phoneNumber})" +
      " on conflict(id) do update " +
      " set name = #{customer.name}, surname = #{customer.surname}, patronymic = #{customer.patronymic}, phoneNumber = #{customer.phoneNumber} ")
  void upsertCustomer(@Param("customer") CustomerRecord customer);
}

