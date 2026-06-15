import type { Option } from '../types/option';

export class OptionsStore {
  private options: Option[] = [];
  private static instance: OptionsStore;

  private constructor() {
    this.loadFromStorage()
  }
  static getInstance(): OptionsStore {
    if (!OptionsStore.instance) {
      OptionsStore.instance = new OptionsStore();
    }
    return OptionsStore.instance;
  }

  private generateId(): string {
    return crypto.randomUUID();
  }

  private saveToStorage(): void {
    localStorage.setItem('decisions' , JSON.stringify(this.options))
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem('decisions')
    if (data) {
        const parsed = JSON.parse(data)
        if ( Array.isArray(parsed ) && parsed.every(opt => {
            typeof opt.id === 'string' &&
            typeof opt.title === 'string' &&
            typeof opt.weight === 'number'
        })){
            this.options = parsed
        }
    }
    
  }

  getAll(): Option[] {
    return this.options;
  }
  addOption(optionData: Omit<Option, 'id'>): void {
    let newId = this.generateId();
    let newOption = { id: newId, title: optionData.title, weight: optionData.weight };
    this.options.push(newOption);
    this.saveToStorage();
  }
  update(id: string, updates: Partial<Option>): void {
    const option = this.options.find((op) => op.id === id);
    if (!option) return;

    if (updates.title !== undefined) {
      option.title = updates.title;
    }
    if (updates.weight !== undefined) {
      option.weight = updates.weight;
    }
    this.saveToStorage();
  }

  delete(id: string): void {
    const index = this.options.findIndex((op) => op.id === id);
    if (index !== -1) {
      this.options.splice(index, 1);
      this.saveToStorage();
    }
  }
  clear(): void {
    this.options = [];
  }
}
