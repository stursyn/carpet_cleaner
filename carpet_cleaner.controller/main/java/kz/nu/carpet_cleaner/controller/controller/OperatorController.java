package kz.nu.carpet_cleaner.controller.controller;

import kz.nu.carpet_cleaner.controller.model.OperatorOrderToSave;
import kz.nu.carpet_cleaner.controller.model.OrderRecord;
import kz.nu.carpet_cleaner.controller.register.OperatorRegister;
import kz.nu.carpet_cleaner.controller.register.OrderRegister;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("operator")
public class OperatorController {

  @Autowired
  private OperatorRegister register;

  @PostMapping("saveOrder")
  public void saveOrder(@RequestBody OperatorOrderToSave toSave) {
    register.saveOrder(toSave);
    return;
  }
}
