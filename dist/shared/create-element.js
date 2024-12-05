export function createElement(elName, attributes, child) {
    const el = document.createElement(elName);
    Object.keys(attributes).forEach((attr) => {
        if (attr in el) {
            el[attr] =
                attributes[attr];
        }
    });
    if (child) {
        el.appendChild(child);
    }
    return el;
}
//# sourceMappingURL=create-element.js.map