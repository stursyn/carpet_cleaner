package kz.nu.carpet_cleaner.controller.register;

import kz.nu.carpet_cleaner.controller.model.DictRecord;

import java.util.List;

public interface DictionaryRegister {
  List<DictRecord> loadDictListByDictType(String dictType);
}
