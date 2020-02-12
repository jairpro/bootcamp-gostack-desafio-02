class Utils {
  static strZero(num, size) {
    const s = `000${num}`;
    return s.substr(s.length - size);
  }

  static fixDateToLocaleString(date) {
    let ls = date;
    if (typeof date === 'object') {
      const ymd = date
        .toLocaleString()
        .split(' ')[0]
        .split('-');
      ymd[1] = Utils.strZero(ymd[1], 2);
      ymd[2] = Utils.strZero(ymd[2], 2);
      const isu = date
        .toLocaleString()
        .split(' ')[1]
        .split(':');
      isu[0] = Utils.strZero(isu[0], 2);
      ls = `${ymd.join('-')} ${isu.join(':')}`;
    }
    return ls;
  }
}

export default Utils;
