import { OptionsStore } from '../store/OptionsStore';
import type { Option } from '../types/Option';

export function renderHomePage(container: HTMLElement): void {
  container.replaceChildren();

  const store = OptionsStore.getInstance();

  const title = document.createElement('h1');
  title.textContent = 'Decision Making Tool';

  const inputs = createInputs();
  const addBtn = createButton('Add');
  const clearBtn = createButton('Clear');
  const pickerBtn = createButton('Go to Picker');
  const listContainer = createListContainer();

  container.append(
    title,
    inputs.optionTitle,
    inputs.optionWeight,
    addBtn,
    clearBtn,
    pickerBtn,
    listContainer,
  );

  const refreshList = () => {
    const handleUpdate = (id: string, updates: Partial<Option>) => {
      store.update(id, updates);
      refreshList();
    };

    const handleDelete = (id: string) => {
      store.delete(id);
      refreshList();
    };

    renderListContainer(container, store, handleUpdate, handleDelete)
  };


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

export function createListContainer(): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'options-list';
  return container;
}

export function createInputs() {
  const optionTitle = document.createElement('input');
  optionTitle.type = 'text';
  optionTitle.name = 'title';
  const optionWeight = document.createElement('input');
  optionWeight.type = 'number';
  optionWeight.name = 'weight';
  return { optionTitle, optionWeight };
}

export function createButton(text: string): HTMLElement {
  const button = document.createElement('button');
  button.textContent = text;
  return button;
}

export function createOptionRow(
  option: Option,
  OnUpdate: (id: string, updates: Partial<Option>) => void,
  OnDelete: (id: string) => void,
): HTMLDivElement {
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
  weightInp.placeholder = '1'
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
  });
  row.append(idSpan, titleInp, weightInp, clearButton);
  return row;
}

export function handleButtonClick(button: HTMLElement): void {
  //const valTitle = document.search.title
  button.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    // const data = optionTitle.value
    console.log('click');
  });
}
