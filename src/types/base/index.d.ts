declare class Vts {
  constructor(formId: string);
  fields: NodeListOf<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
}

export default Vts;
