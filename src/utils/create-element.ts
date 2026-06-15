export type ElementAttributes = Record<string, string>;

export type CreateElementOptions = {
  tagName: keyof HTMLElementTagNameMap;
  className?: string;
  textContent?: string;
  attributes?: ElementAttributes;
  children?: HTMLElement[];
};

export function createElement(options: CreateElementOptions): HTMLElement {
  const element = document.createElement(options.tagName);

  if (options.className !== undefined) {
    element.className = options.className;
  }

  if (options.textContent !== undefined) {
    element.textContent = options.textContent;
  }

  if (options.attributes !== undefined) {
    for (const [name, value] of Object.entries(options.attributes)) {
      element.setAttribute(name, value);
    }
  }

  if (options.children !== undefined) {
    element.replaceChildren(...options.children);
  }

  return element;
}
