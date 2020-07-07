package kz.nu.carpet_cleaner.register.register.impl;

import kz.nu.carpet_cleaner.controller.model.DictRecord;
import kz.nu.carpet_cleaner.controller.register.DictionaryRegister;
import kz.nu.carpet_cleaner.register.dao.DictionaryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DictionaryRegisterImpl implements DictionaryRegister {

  @Autowired
  private DictionaryDao dictionaryDao;

  @Override
  public List<DictRecord> loadDictListByDictType(String dictType) {
    return dictionaryDao.loadDictionaryByDictType(dictType);
  }
}
