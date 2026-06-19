export function renderErrorPage(container: HTMLElement): void {
      container.replaceChildren();
    const title = document.createElement('h2')
title.textContent = 'Error : 404'
    container.append(title)
}