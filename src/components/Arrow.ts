export function drawArrow(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.id = 'canvas-arrow';
  if (!ctx) throw new Error('canvas is not created');
  canvas.width = 600;
  canvas.height = 600;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - 200);
  ctx.lineTo(centerX, centerY - 160);

  ctx.moveTo(centerX, centerY - 160);
  ctx.lineTo(centerX + 15, centerY - 180);

  ctx.moveTo(centerX, centerY - 160);
  ctx.lineTo(centerX - 15, centerY - 180);
  ctx.stroke();
  return canvas;
}
