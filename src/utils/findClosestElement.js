/**
 * @param {HTMLElement|null} element
 * @param {String} [className='']
 * @param {null|HTMLElement } [initialParent=null]
 */
export default function findClosestElement(
  element,
  className = '',
  initialParent = null
) {
  if (!element) return initialParent;

  let wrapper;

  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  ) {
    wrapper = className ? element.closest(`.${className}`) : null;
  } else {
    wrapper = className ? element.querySelector(`.${className}`) : null;
  }

  if (wrapper) {
    return wrapper;
  } else {
    const parent = element.parentElement;
    if (!initialParent) initialParent = parent;
    return parent
      ? findClosestElement(element.parentElement, className, initialParent)
      : initialParent;
  }
}
