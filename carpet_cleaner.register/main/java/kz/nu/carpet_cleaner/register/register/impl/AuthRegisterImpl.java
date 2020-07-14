package kz.nu.carpet_cleaner.register.register.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import kz.greetgo.util.RND;
import kz.nu.carpet_cleaner.controller.exception.RestApiException;
import kz.nu.carpet_cleaner.controller.in_service.KeycloakInService;
import kz.nu.carpet_cleaner.controller.model.*;
import kz.nu.carpet_cleaner.controller.register.AuthRegister;
import kz.nu.carpet_cleaner.register.dao.EmployeeDao;
import kz.nu.carpet_cleaner.register.model.EmployeeRecord;
import kz.nu.carpet_cleaner.register.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthRegisterImpl implements AuthRegister {

  @Autowired
  private KeycloakInService keycloakInService;

  @Autowired
  private EmployeeDao employeeDao;

  @Override
  public AuthUser authorize(AuthRecord authRecord) {
    AuthUser ret = new AuthUser();
    String body = keycloakInService.loginToKeycloak(authRecord.login, authRecord.password).body;
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
      KeycloakTokenRecord keycloakTokenRecord = objectMapper.readValue(body, KeycloakTokenRecord.class);
      if(keycloakTokenRecord.error != null) throw new RestApiException(Response.error(keycloakTokenRecord.error_description));
      String userInfoBody = keycloakInService.userInfoKeycloak(keycloakTokenRecord.access_token).body;
      KeycloakUserInfoRecord keycloakUserInfoRecord = objectMapper.readValue(userInfoBody, KeycloakUserInfoRecord.class);

      employeeDao.upsertEmployee(EmployeeRecord.of(RND.strEng(30), authRecord.login,
          keycloakUserInfoRecord.given_name, keycloakUserInfoRecord.family_name));

      EmployeeRecord employee = employeeDao.loadEmployeeByLogin(authRecord.login);
      employeeDao.upsertToken(keycloakTokenRecord.access_token, keycloakTokenRecord.refresh_token, employee.id);

      ret.token = keycloakTokenRecord.access_token;
      ret.name = keycloakUserInfoRecord.given_name;
      ret.surname = keycloakUserInfoRecord.family_name;
      ret.role = employee==null? Role.OPERATOR.name():employee.role.name();

    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    return ret;
  }

  @Override
  public void logout(String authorizationToken) {

    String body = keycloakInService.logoutFromKeycloak(authorizationToken, employeeDao.loadRefreshToken(authorizationToken
        .replace("Bearer ", "")
        .replace("bearer ", ""))
    ).body;

    System.out.println(body);
  }
}
