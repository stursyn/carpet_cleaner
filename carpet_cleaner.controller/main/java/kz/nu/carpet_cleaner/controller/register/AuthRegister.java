package kz.nu.carpet_cleaner.controller.register;

import kz.nu.carpet_cleaner.controller.model.AuthRecord;
import kz.nu.carpet_cleaner.controller.model.AuthUser;

public interface AuthRegister {
  AuthUser authorize(AuthRecord authRecord);

  void logout(String authorizationToken);

}
