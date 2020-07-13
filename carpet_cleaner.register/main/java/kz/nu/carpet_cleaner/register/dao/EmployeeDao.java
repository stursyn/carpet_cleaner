package kz.nu.carpet_cleaner.register.dao;

import kz.nu.carpet_cleaner.register.model.EmployeeRecord;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface EmployeeDao {
  @Insert("insert into employee(id, login, name, surname) values " +
      " (#{employee.id}, #{employee.login}, #{employee.name}, #{employee.surname}) " +
      " on conflict (login) do update set " +
      " name = #{employee.name}, surname = #{employee.surname}")
  void upsertEmployee(@Param("employee") EmployeeRecord employee);

  @Insert("insert into token (token, refreshToken, employeeId) values " +
      " (#{token}, #{refreshToken}, #{employeeId}) " +
      " on conflict (token) do update set " +
      " refreshToken = #{refreshToken}, employeeId = #{employeeId}")
  void upsertToken(@Param("token") String token,
                   @Param("refreshToken") String refreshToken,
                   @Param("employeeId") String employeeId);

  @Select("select refreshToken from token where token=#{token}")
  String loadRefreshToken(@Param("token") String token);

  @Select("select id from employee where login=#{login}")
  String loadEmployeeId(@Param("login") String login);

  @Select("select * from employee where login=#{login}")
  EmployeeRecord loadEmployeeByLogin(@Param("login") String login);

}
