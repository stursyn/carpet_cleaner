package kz.greetgo.aix_service_bus.register.util;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Random;

public class RND {

  private static final String rus = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  private static final String RUS = rus.toUpperCase();

  private static final String eng = "abcdefghijklmnopqrstuvwxyz";
  private static final String ENG = eng.toUpperCase();

  private static final String DEG = "0123456789";

  private static final String ALL = rus + RUS + eng + ENG + DEG;
  private static final char[] ALL_CHARS = ALL.toCharArray();
  private static final int ALL_CHARS_LENGTH = ALL_CHARS.length;

  private static final String ALL_ENG = eng + ENG + DEG;
  private static final char[] ALL_ENG_CHARS = ALL_ENG.toCharArray();
  private static final int ALL_ENG_CHARS_LENGTH = ALL_ENG_CHARS.length;

  private static final Random rnd = new Random();

  /**
   * Generates random string with a length of <code>len</code> characters. Characters are selected randomly from the
   * following array: Arabic numerals, Russian alphabet uppercase and lowercase, English alphabet uppercase and
   * lowercase.
   *
   * @param len the length of generate string
   * @return generated string
   */
  public static String str(int len) {
    char[] charArray = new char[len];
    for (int i = 0; i < len; i++) {
      charArray[i] = ALL_CHARS[rnd.nextInt(ALL_CHARS_LENGTH)];
    }
    return new String(charArray);
  }

  /**
   * Generates random string with a length of <code>len</code> characters. Characters are selected randomly from the
   * following array: Arabic numerals, English alphabet uppercase and lowercase.
   *
   * @param len the length of generate string
   * @return generated string
   */
  public static String strEng(int len) {
    char[] charArray = new char[len];
    for (int i = 0; i < len; i++) {
      charArray[i] = ALL_ENG_CHARS[rnd.nextInt(ALL_ENG_CHARS_LENGTH)];
    }
    return new String(charArray);
  }

  /**
   * Generates a string consisting of random numbers
   *
   * @param len the length of generate string
   * @return generated string
   */
  @Deprecated
  public static String intStr(int len) {
    return strInt(len);
  }

  /**
   * Generates a string consisting of random numbers
   *
   * @param len the length of generate string
   * @return generated string
   */
  public static String strInt(int len) {
    char[] charArray = new char[len];
    for (int i = 0; i < len; i++) {
      charArray[i] = DEG.charAt(rnd.nextInt(DEG.length()));
    }
    return new String(charArray);
  }

  /**
   * <p>
   * Generates a random positive number of type <code>long</code> in the range
   * </p>
   * <p>
   * 0 &lt;= x &lt; max
   * </p>
   *
   * @param max the maximum value of the generate number
   * @return generated number
   */
  public static long plusLong(long max) {
    long L = rnd.nextLong();
    if (L < 0) {
      L = -L;
    }
    return L % max;
  }

  /**
   * <p>
   * Generates a random positive number of type <code>int</code> in the range
   * </p>
   * <p>
   * 0 &lt;= x &lt; max
   * </p>
   *
   * @param max the maximum value of the generate number
   * @return generated number
   */
  public static int plusInt(int max) {
    return rnd.nextInt(max);
  }

  /**
   * Generates a random date in the range from <code>yearFrom</code> years ago, to
   * <code>yearTo</code> years ago
   *
   * @param yearFrom as many years ago - range start in which date is generated
   * @param yearTo as many years ago - range end in which date is generated
   * @return randomly generated date
   */
  public static Date dateYears(int yearFrom, int yearTo) {
    Calendar cal = new GregorianCalendar();
    cal.add(Calendar.YEAR, yearFrom);
    long from = cal.getTimeInMillis();
    cal.add(Calendar.YEAR, yearTo - yearFrom);
    long to = cal.getTimeInMillis();
    if (from > to) {
      long tmp = from;
      from = to;
      to = tmp;
    }
    final long time = from + plusLong(to - from);
    return new Date(time);
  }

  /**
   * Generates a random date in the range from <code>fromDaysBeforeNow</code> days ago, to
   * <code>toDayAfterNow</code> days ago
   *
   * @param fromDaysBeforeNow as many days ago - range start in which date is generated
   * @param toDayAfterNow as many days ago - range end in which date is generated
   * @return randomly generated date
   */
  public static Date dateDays(int fromDaysBeforeNow, int toDayAfterNow) {
    Calendar cal = new GregorianCalendar();
    cal.add(Calendar.DAY_OF_YEAR, fromDaysBeforeNow);
    long from = cal.getTimeInMillis();
    cal.add(Calendar.DAY_OF_YEAR, toDayAfterNow - fromDaysBeforeNow);
    long to = cal.getTimeInMillis();
    long x = plusLong(to - from);
    cal.setTimeInMillis(from + x);
    return cal.getTime();
  }

  /**
   * Generates a random array with a lenght <code>len</code>
   *
   * @param len the lenght of generate array
   * @return generated array
   */
  public static byte[] byteArray(int len) {
    final byte[] ret = new byte[len];
    rnd.nextBytes(ret);
    return ret;
  }

  /**
   * Generates random Boolean value
   *
   * @return generated random value
   */
  public static boolean bool() {
    return plusInt(10) % 2 == 0;
  }

  /**
   * Selects a random value from the values transmitted from enum
   *
   * @param values enum values
   * @return randomly selected value
   */
  @SafeVarargs
  public static <E extends Enum<E>> E someEnum(E... values) {
    return values[rnd.nextInt(values.length)];
  }

  public static String someString(String... values) {
    return values[rnd.nextInt(values.length)];
  }

  public static String rndEmail() {
    return rndEmail(RND.plusInt(100));
  }

  public static String rndCounty() {
    return  RND.someString("KZ", "RU", "AF");
  }

  public static String rndEmail(int length) {
    return RND.strEng(length) + "@" + RND.someString("gmail.com", "outlook.com", "mail.ru", "yahoo.com");
  }

  public static String rndPhone(int length) {
    return "+" + RND.strInt(length);
  }

  /**
   * <p>
   * Generates a random real positive number in the range
   * </p>
   * <p>
   * 0 &lt;= x &lt; max
   * </p>
   *
   * @param max the upper limit of the selected values
   * @param point the number of decimal places
   * @return generated number
   */
  public static double plusDouble(double max, int point) {
    double ret = rnd.nextDouble();
    ret *= max;
    for (int i = 0; i < point; i++) {
      ret *= 10.0;
    }
    ret = Math.floor(ret);
    for (int i = 0; i < point; i++) {
      ret /= 10.0;
    }
    return ret;
  }

  /**
   * <p>
   * Generates a random number of type <code>BigDecimal</code> in the range
   * </p>
   * <p>
   * 0 &lt;= x &lt; max
   * </p>
   *
   * @param max the upper limit of generate number
   * @param afterPoint the number of decimal places
   * @return generated number
   */
  public static BigDecimal bd(long max, int afterPoint) {
    BigDecimal ret = new BigDecimal(plusLong(max));
    for (int i = 0; i < afterPoint; i++) {
      ret = ret.multiply(BigDecimal.TEN);
      ret = ret.add(new BigDecimal(plusInt(10)));
    }

    for (int i = 0; i < afterPoint; i++) {
      //noinspection BigDecimalMethodWithoutRoundingCalled
      ret = ret.divide(BigDecimal.TEN);
    }
    return ret;
  }

}
