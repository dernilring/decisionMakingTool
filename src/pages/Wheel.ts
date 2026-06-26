import { createButton } from '../components/Button';
import { createCanvasWrapper } from '../components/CanvasWrapper';
import { router } from '../router/router';

export function renderWheelPage(container: HTMLElement): void {
  container.replaceChildren();
  const { wrapper, wheelCanvas } = createCanvasWrapper();
  const wheel = wheelCanvas;

  const duration = document.createElement('input');
  duration.type = 'number';
  duration.min = '1';
  duration.value = '1';
  duration.style.margin = '10px';

  const startBtn = createButton('Start');
  startBtn.style.margin = '10px';
  const backBtn = createButton('back');
  backBtn.addEventListener('click', () => {
    router.navigate('home');
  });

  let durationTime = 0;
  let startAngle = 0;
  let targetAngle = 0;
  let startTime = 0;
  let animationId: number | null = null;

  startBtn.addEventListener('click', () => {
    startSpin();
  });

  function back(x: number, timeFraction: number) {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
  }

  function onSpinComplete(finalAngle: number): void {
    //todo : sound , animation
    console.log('Spin complete! Final angle:', finalAngle);
  }
  function startSpin() {
    durationTime = Number(duration.value) * 1000;

    startAngle = 0;
    targetAngle = startAngle + 5 * 2 * Math.PI + Math.random() * 2 * Math.PI;
    startTime = performance.now();
    animationId = requestAnimationFrame(spin);
  }

  function spin(timestamp: number) {
    if (wheel === null) return;

    let elapsed = timestamp - startTime;
    let progress = Math.min(elapsed / durationTime, 1);
    let eased = back(1.5, progress);
    let currentAngle = startAngle + (targetAngle - startAngle) * eased;

    wheel.style.transform = `rotate(${currentAngle}rad)`;

    if (progress < 1) {
      animationId = requestAnimationFrame(spin);
    } else {
      animationId = null;
      onSpinComplete(currentAngle);
    }
  }
  startBtn.addEventListener('click', startSpin);
  container.append(backBtn, startBtn, duration, wrapper);
}
