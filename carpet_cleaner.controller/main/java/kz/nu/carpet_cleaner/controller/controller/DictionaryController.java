package kz.nu.carpet_cleaner.controller.controller;

import kz.nu.carpet_cleaner.controller.model.CustomerRecord;
import kz.nu.carpet_cleaner.controller.model.DictRecord;
import kz.nu.carpet_cleaner.controller.register.CustomerRegister;
import kz.nu.carpet_cleaner.controller.register.DictionaryRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("dictionary")
public class DictionaryController {

  @Autowired
  private DictionaryRegister register;

  @GetMapping("list")
  public List<DictRecord> searchByPhone(@RequestParam("dictType") String dictType) {
    return register.loadDictListByDictType(dictType);
  }

}
