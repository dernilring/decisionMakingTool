import { OptionsStore } from '../store/OptionsStore';

export function drawCircle(container: HTMLElement) {
  const store = OptionsStore.getInstance();

  const options = store.getAll();
  const optionsCount = options.length;

  if (optionsCount < 2) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = 600;
  canvas.height = 600;
  ctx.lineWidth = 3;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 200;
  ctx.strokeStyle = 'rgba(0,0,0,.4)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(197, 250, 245, 0.8)';
  ctx.fill();
  ctx.stroke();
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#000';

  const totalWeight = options.reduce((sum, opt) => sum + opt.weight, 0);
  let startAngle = 0;

options.forEach((opt) => {
  const sectorAngle = (opt.weight / totalWeight) * 2 * Math.PI;
  const avgAngle = sectorAngle / 2 + startAngle;

  
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const alpha = 0.8; 


  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, startAngle + sectorAngle);
  ctx.closePath();
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.stroke();


  const x = centerX + radius * 0.6 * Math.cos(avgAngle);
  const y = centerY + radius * 0.6 * Math.sin(avgAngle);
  ctx.fillStyle = '#000';
  ctx.fillText(opt.title, x, y);

  startAngle += sectorAngle;
});

  container.append(canvas);
}
