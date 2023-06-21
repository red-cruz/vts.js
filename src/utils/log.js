import Vts from '../vts';

export default class logUtil {
  /**
   * @description
   * @author RED
   * @static
   * @param {Vts} Vts
   * @memberof logUtil
   */
  static start(Vts) {
    const mustLog = Vts.config.log;
    mustLog && console.group('vts#' + Vts.form.id);
    mustLog && console.time('vts_time#' + Vts.form.id);
    logUtil.show(mustLog, 'log', Vts);
  }

  static show(mustLog, type, ...message) {
    if (!mustLog) return;

    const msg = '%c' + message;
    const style = 'color: static FFFFFF; padding: 5px';

    switch (type) {
      case 'log':
        console.log(...message);
        break;
      case 'info':
        console.info(msg, 'background: static 5DADE2;' + style);
        break;
      case 'success':
        console.info(msg, 'background: static 008000;' + style);
        break;
      case 'warn':
        console.info(msg, 'background: static FF8C00;' + style);
        break;
      case 'error':
        console.info(msg, 'background: static FF0000;' + style);
    }
  }

  static end(mustLog, formId) {
    mustLog && console.groupEnd('vts#' + formId);
    mustLog && console.timeEnd('vts_time#' + formId);
  }
}
