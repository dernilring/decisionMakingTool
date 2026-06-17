import { OptionsStore } from '../store/OptionsStore';
import type { Option } from '../types/Option';
import { renderListContainer } from '../components/Options-list';
import { createButton } from '../components/Action-panel';
import { createInputs, createOptionRow } from '../components/Option-row';
import { createListContainer } from '../components/Options-list';

export function renderHomePage(container: HTMLElement): void {
  container.replaceChildren();

  const store = OptionsStore.getInstance();
  const rowsMap = new Map<
    string,
    { row: HTMLDivElement; titleInput: HTMLInputElement; weightInput: HTMLInputElement }
  >();

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

  const handleUpdate = (id: string, updates: Partial<Option>) => {
    const entry = rowsMap.get(id);
    if (!entry) {
      return;
    }
    store.update(id, updates);
    if (updates.title !== undefined && updates.weight !== undefined) {
      entry.titleInput.value = updates.title;
      entry.weightInput.value = String(updates.weight);
    }
  };

  const handleDelete = (id: string) => {
    const entry = rowsMap.get(id);
    if (!entry) {
      return;
    }
    entry.row.remove();
    rowsMap.delete(id);
    store.delete(id);
  };
  const handleCreateNewOption = (option: Option) => {
    const row = createOptionRow(option, handleUpdate, handleDelete);
    const titleInput = row.querySelector('input[type="text"]') as HTMLInputElement;
    const weightInput = row.querySelector('input[type="number"]') as HTMLInputElement;
    rowsMap.set(option.id, { row, titleInput, weightInput });
    listContainer.appendChild(row);
  };

  const initList = () => {
    listContainer.replaceChildren();
    rowsMap.clear();

    const options = store.getAll();
    for (let option of options) {
      handleCreateNewOption(option);
    }
  };

  addBtn.addEventListener('click', () => {
    const title = inputs.optionTitle.value.trim();
    const weight = Number(inputs.optionWeight.value);

    const newOption = store.addOption({ title, weight });
    handleCreateNewOption(newOption);
    inputs.optionTitle.value = '';
    inputs.optionWeight.value = '';
  });

  clearBtn.addEventListener('click', ()=>{
    store.clear()
    listContainer.replaceChildren()
    rowsMap.clear()

  })
  pickerBtn.addEventListener('click', () =>{
    console.log('in progress...')
  })
  initList();
}
