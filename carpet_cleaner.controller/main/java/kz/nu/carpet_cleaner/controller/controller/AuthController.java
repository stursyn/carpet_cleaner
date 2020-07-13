package kz.nu.carpet_cleaner.controller.controller;

import kz.nu.carpet_cleaner.controller.model.AuthRecord;
import kz.nu.carpet_cleaner.controller.model.AuthUser;
import kz.nu.carpet_cleaner.controller.register.AuthRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:5002"}, allowCredentials = "true")
@RestController
@RequestMapping("auth")
public class AuthController {

  @Autowired
  private AuthRegister register;

  @PostMapping("/authorize")
  public AuthUser authorize(@RequestBody AuthRecord authRecord) {
    return register.authorize(authRecord);
  }

  @PostMapping("/signOut")
  public void logout(@RequestHeader("Authorization") String authorizationToken) {
    register.logout(authorizationToken);
  }
}
