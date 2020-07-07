package kz.nu.carpet_cleaner.controller.register;

import kz.nu.carpet_cleaner.controller.model.OperatorOrderToSave;

public interface OperatorRegister {
  void saveOrder(OperatorOrderToSave toSave);
}
