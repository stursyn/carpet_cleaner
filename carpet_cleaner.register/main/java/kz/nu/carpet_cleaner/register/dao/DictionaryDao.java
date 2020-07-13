package kz.nu.carpet_cleaner.register.dao;

import kz.nu.carpet_cleaner.controller.model.DictRecord;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface DictionaryDao {

  @Select("select code as value, title, value as priceValue from application_dict where dictType = #{dictType}")
  List<DictRecord> loadDictionaryByDictType(@Param("dictType") String dictType);

}
