//import { OptionsStore } from "../store/OptionsStore";

// const action : Object {//
//     'add' : addOption(),
//     ''
// }

export function createButton(text: string): HTMLElement {
  const button = document.createElement('button');
  button.textContent = text;
  return button;
}


export function handleButtonClick(button: HTMLElement): void {
  //const valTitle = document.search.title
  button.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    // const data = optionTitle.value
    console.log('click');
  });
}



