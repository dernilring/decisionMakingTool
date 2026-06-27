import { renderHomePage } from '../pages/Home';
import type { Page } from '../types/Page';
import { renderErrorPage } from '../pages/Error';
import { renderWheelPage } from '../pages/Wheel';

export function renderPage(container: HTMLElement, page: Page) {
  switch (page) {
    case 'home':
      renderHomePage(container);
      break;
    case 'wheel':
      renderWheelPage(container);
      break;
    case 'error':
      renderErrorPage(container);
      break;
    default:
      renderErrorPage(container);
      break;
  }
}
