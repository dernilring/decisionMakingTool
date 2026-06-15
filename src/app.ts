import { createElement } from './utils/create-element';

export function initApp(): void {
  const root = createElement({
    tagName: 'div',
    className: 'app',
    textContent: 'Decision List',
  });

  document.body.append(root);
}
