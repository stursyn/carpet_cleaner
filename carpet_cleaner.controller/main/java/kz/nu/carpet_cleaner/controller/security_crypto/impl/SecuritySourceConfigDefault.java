package kz.nu.carpet_cleaner.controller.security_crypto.impl;

import kz.nu.carpet_cleaner.controller.security_crypto.SecuritySourceConfig;

public class SecuritySourceConfigDefault implements SecuritySourceConfig {

  @Override
  public String secureRandomAlgorithm() {
    return "SHA1PRNG";
  }

  @Override
  public String messageDigestAlgorithm() {
    return "SHA-256";
  }

  @Override
  public String keyPairGeneratorAlgorithm() {
    return "RSA";
  }

  @Override
  public String cipherAlgorithm() {
    return "RSA";
  }

  @Override
  public String keyFactoryAlgorithm() {
    return "RSA";
  }

}
