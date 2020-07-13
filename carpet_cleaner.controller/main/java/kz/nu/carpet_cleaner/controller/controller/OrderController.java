package kz.nu.carpet_cleaner.controller.controller;

import kz.nu.carpet_cleaner.controller.model.StringResponse;
import kz.nu.carpet_cleaner.controller.register.OrderRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("order")
public class OrderController {

  @Autowired
  private OrderRegister register;

  @GetMapping("nextNumber")
  public ResponseEntity<StringResponse> getNextNumber() {
    return ResponseEntity.ok(StringResponse.of(register.getNextOrderNumber()));
  }

  @GetMapping("price")
  public Double price(@RequestParam("service") String service,
                                     @RequestParam("type") String type,
                                     @RequestParam("material") String material,
                                     @RequestParam("measurement") String measurement) {
    return register.getPrice(service, type, material, measurement);
  }
}
