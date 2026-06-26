import type { Page } from '../types/Page';

type Listener = (container : HTMLElement, page: Page) => void;

class Router {
  private listeners: Listener[] = [];
  private container: HTMLElement | null = null;

  init(container: HTMLElement) {
    this.container = container;
    window.addEventListener('hashchange', () => this.notify());
    this.notify();
  }

  private getCurrentPage(): Page {
    const hash = window.location.hash.slice(1) || 'home';
    switch (hash) {
      case 'home':
        return 'home';
      case 'wheel':
        return 'wheel';
      case 'error':
        return 'error';
      default:
        return 'error';
    }
  }

  navigate(page: Page): void {
    switch (page) {
      case 'home':
        window.location.hash = 'home';
        break;
      case 'wheel':
        window.location.hash = 'wheel';
        break;
      case 'error':
        window.location.hash = 'error';
        break;
    }
  }
  private notify(): void {
    if (!this.container) return;
    const page = this.getCurrentPage();
    this.listeners.forEach((listener) => listener(this.container!, page));
  }
  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    if (this.container) {
      listener(this.container, this.getCurrentPage());
    }
    return () => {
      this.listeners.filter((l) => l !== listener);
    };
  }
}
export const router = new Router();
