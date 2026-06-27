import { drawArrow } from '../components/Arrow';
import { drawCircle } from '../components/Canvas';
import type { Option } from '../types/Option';

export function createCanvasWrapper(options : Option[]): {
  wrapper: HTMLDivElement;
  wheelCanvas: HTMLCanvasElement;
  arrowCanvas: HTMLCanvasElement;
  sectors : { option : Option, startAngle : number , sectorAngle : number }[]
} {

  const{canvas: wheelCanvas, sectors } = drawCircle();
  const arrowCanvas = drawArrow();

  const wrapper = document.createElement('div');
  wrapper.className = 'canvas-wrapper'

  const positionCanvas = (canvas: HTMLCanvasElement) => {
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  };

  positionCanvas(wheelCanvas);
  wheelCanvas.style.transformOrigin = 'center center';

  positionCanvas(arrowCanvas);
  arrowCanvas.style.pointerEvents = 'none'; 

  wrapper.appendChild(wheelCanvas);
  wrapper.appendChild(arrowCanvas);

  return { wrapper, wheelCanvas, arrowCanvas, sectors };
}