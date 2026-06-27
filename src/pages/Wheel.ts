import { createButton } from '../components/Button';
import { createCanvasWrapper } from '../components/CanvasWrapper';
import { router } from '../router/router';
import { OptionsStore } from '../store/OptionsStore';
import type { Option } from '../types/Option';

export function renderWheelPage(container: HTMLElement): void {
  container.replaceChildren();
  const store = OptionsStore.getInstance();

  const options = store.getAll();
  const { wrapper, wheelCanvas, sectors } = createCanvasWrapper(options);
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


  const resultDiv = document.createElement('div');
  resultDiv.className = 'picked-option'

  startBtn.addEventListener('click', () => {
    startSpin();
  });

  function back(x: number, timeFraction: number) {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
  }

  function onSpinComplete(finalAngle: number): void {
    //todo : sound , animation
    const selected = getSelectedOption(finalAngle, sectors);
    console.log('Spin complete! Final angle:', finalAngle);
    if (selected) {
      console.log('result ', selected.title);
      resultDiv.textContent = selected.title;
    }
    wheel;
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
  function getSelectedOption(
    currentAngle: number,
    sectors: { option: Option; startAngle: number; sectorAngle: number }[],
  ): Option | null {
    const pointerAngle = -Math.PI / 2;
    let current = (pointerAngle - currentAngle) % (2 * Math.PI);
    if (current < 0) {
      current += 2 * Math.PI;
    }
    let accum = 0;
    for (const sector of sectors) {
      accum += sector.sectorAngle;
      if (current <= accum) {
        return sector.option;
      }
    }
    return sectors[sectors.length - 1]?.option ?? null;
  }
  startBtn.addEventListener('click', startSpin);
  container.append(backBtn, startBtn, duration, resultDiv, wrapper);
}
