import { createButton } from '../components/Action-panel';
import { drawCircle } from '../components/canvas';

export function renderWheelPage(container: HTMLElement): void {
  container.replaceChildren();

  const startBtn = createButton('Start');
 
  // startBtn.addEventListener('click', () => {
  //   spin();
  // });

  const duration = document.createElement('input');
  duration.type = 'number';
  duration.min = '1';
  //duration.value = String(option.weight);
drawCircle(container)

  container.append(startBtn);
}

//   const title = document.createElement('h2');
//   title.textContent = 'wheel';
//   container.append(title);