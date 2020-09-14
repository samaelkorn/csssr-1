class OwnReact {
  static createElement(type, props, ...children) {
    return {
      type,
      props: { ...props, children }
    };
  }

  static render(element, parentDom) {
    const isTextElement = typeof element === "string";
    let dom = null;

    if (!isTextElement) {
      const { type, props } = element;
      dom = document.createElement(type);
      const childElements = props.children ?? [];
      childElements.forEach(childElement => this.render(childElement, dom));
    } else {
      dom = document.createTextNode(element ?? "");
    }
    // вставка результата в DOM
    parentDom.appendChild(dom);
  }
}

export default OwnReact;
