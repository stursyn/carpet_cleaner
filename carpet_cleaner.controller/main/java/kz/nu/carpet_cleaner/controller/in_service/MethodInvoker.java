package kz.nu.carpet_cleaner.controller.in_service;

import kz.nu.carpet_cleaner.controller.model.Response;

public interface MethodInvoker<T> {

  Response<T> invoke();

}
