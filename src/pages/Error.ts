import { createButton } from '../components/Button';
import { router } from '../router/router';

export function renderErrorPage(container: HTMLElement): void {
  container.replaceChildren();
  const title = document.createElement('h2');
  title.textContent = 'Error : 404';

  const backBtn = createButton('back');
  backBtn.addEventListener('click', () => {
    router.navigate('home');
  });
  container.append(backBtn);
  container.append(title);
}
