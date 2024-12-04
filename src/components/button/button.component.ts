import { createElement } from '../../shared/create-element.js';

export interface ButtonOptions {
    type?: 'button' | 'submit' | 'reset' | undefined;
    className?: string;
    text?: string;
}

export function button(attributes: ButtonOptions, child: HTMLElement) {
    return createElement(
        'button',
        { type: attributes.type, innerText: attributes.text, className: attributes.className },
        child
    );
}
