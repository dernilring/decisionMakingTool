

import type { Option } from "../types/Option";

export function createInputs() {
  const optionTitle = document.createElement('input');
  optionTitle.type = 'text';
  optionTitle.name = 'title';
  const optionWeight = document.createElement('input');
  optionWeight.type = 'number';
  optionWeight.name = 'weight';
  return { optionTitle, optionWeight };
}

export function createOptionRow(
  option: Option,
  OnUpdate: (id: string, updates: Partial<Option>) => void,
  OnDelete: (id: string) => void,
) : HTMLDivElement {
  const row = document.createElement('div');
  row.className = 'option-row';

  const idSpan = document.createElement('span');
  idSpan.textContent = option.id;

  const titleInp = document.createElement('input');
  titleInp.textContent = option.title;
  titleInp.placeholder = 'title...'

  const weightInp = document.createElement('input');
  weightInp.type = 'number';
  weightInp.min = '1';
  weightInp.value = String(option.weight);

  titleInp.addEventListener('input', () => {
    OnUpdate(option.id, { title: titleInp.value });
  });
  weightInp.addEventListener('input', () => {
    const enteredValue = Number(weightInp.value);
    if (!isNaN(enteredValue) && enteredValue > 0) {
      OnUpdate(option.id, { weight: Number(weightInp.value) });
    }
  });
  const clearButton = document.createElement('button');
  clearButton.textContent = 'clear';
  clearButton.addEventListener('click', () => {
    OnDelete(option.id);
    console.log('delete')
  });
  row.append(titleInp, weightInp, clearButton);
  return row;
}