import { createElement } from '../../shared/create-element.js';
export function button(attributes, child) {
    return createElement('button', { type: attributes.type, innerText: attributes.text, className: attributes.className }, child);
}
//# sourceMappingURL=button.component.js.map