import { renderPage } from '../router/renderPage';
import { router } from '../router/router';
import { createElement } from '../utils/create-element';

export function initApp(): void {
  const root = createElement({
    tagName: 'div',
    className: 'app',
  });

  document.body.append(root);
  router.subscribe(renderPage)
  router.init(root)
}
