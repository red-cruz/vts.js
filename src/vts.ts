import VtsStatic from './static';

export default class Vts extends VtsStatic {
  name: string;
  constructor(config: string) {
    super();
    console.log(config);
  }
}

const v = new Vts('');
Vts.getResponseMessage;
