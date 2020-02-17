import { format } from 'date-fns';

class Utils {
  static strZero(num, size) {
    const s = `000${num}`;
    return s.substr(s.length - size);
  }

  static fixDateToLocaleString(date) {
    if (JSON.parse(process.env.TZ_FIX)) {
      return format(date, process.env.TZ_FORMAT, {
        tz: process.env.TZ_LOCALE,
      });
    }
    return date;
  }
}

export default Utils;
