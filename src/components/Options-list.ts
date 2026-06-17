
import { OptionsStore } from '../store/OptionsStore';
import type { Option } from '../types/Option';
import { createOptionRow } from './Option-row';

export function createListContainer(): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'options-list';
  return container;
}

export function renderListContainer(
  container: HTMLElement,
  store: OptionsStore,
  OnUpdate: (id: string, updates: Partial<Option>) => void,
  OnDelete: (id: string) => void,
) {
  container.replaceChildren();
  const options = store.getAll();

  for (const opt of options) {
    const row = createOptionRow(opt, OnUpdate, OnDelete);
    container.appendChild(row);
  }
}