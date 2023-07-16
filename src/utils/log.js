import Vts from '../Vts';

export default class LogUtil {
  /**
   * Creates an instance of LogUtil.
   * @author RED
   * @param {Vts} Vts
   * @memberof LogUtil
   */
  constructor(Vts) {
    this.vts = Vts;
    this.mustLog = Vts.config.log;
    this.formId = Vts.form.id;
  }

  start() {
    const mustLog = this.mustLog;
    const formId = this.formId;
    if (!mustLog) return;
    console.group('vts#' + formId);
    console.time('vts_time#' + formId);
    this.show('log', this.vts);
  }

  show(type, ...message) {
    if (!this.mustLog) return;

    const msg = '%c' + message.join(' ');
    const style = 'color: #FFFFFF; padding: 5px';

    switch (type) {
      case 'log':
        console.log(...message);
        break;
      case 'info':
        console.info(msg, 'background: #5DADE2;' + style);
        break;
      case 'success':
        console.info(msg, 'background: #008000;' + style);
        break;
      case 'warn':
        console.warn(...message);
        break;
      case 'error':
        console.error(...message);
        break;
    }
  }

  end() {
    const formId = this.formId;
    if (!this.mustLog) return;
    this.show('info', 'Validation ended');
    console.timeEnd('vts_time#' + formId);
    console.groupEnd('vts#' + formId);
  }
}
