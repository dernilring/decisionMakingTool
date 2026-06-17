import { createElement } from '../utils/create-element';
import { renderHomePage } from '../pages/Home';

export function initApp(): void {
  const root = createElement({
    tagName: 'div',
    className: 'app',
  });

  document.body.append(root);
  renderHomePage(root)
}
