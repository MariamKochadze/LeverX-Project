type Attributes<T extends HTMLElement> = {
  [K in keyof T]?: T[K];
};

export function createElement<K extends keyof HTMLElementTagNameMap>(
  elName: K,
  attributes: Attributes<HTMLElementTagNameMap[K]>,
  child?: HTMLElement
): HTMLElementTagNameMap[K] {
  const el = document.createElement(elName);

  Object.keys(attributes).forEach((attr) => {
    if (attr in el) {
      (el as HTMLElementTagNameMap[K])[attr as keyof HTMLElementTagNameMap[K]] =
        attributes[attr as keyof HTMLElementTagNameMap[K]]!;
    }
  });

  if (child) {
    el.appendChild(child);
  }

  return el as HTMLElementTagNameMap[K];
}
