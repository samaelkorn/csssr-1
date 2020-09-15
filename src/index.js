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
      const isListener = name => name.startsWith("on");
      Object.keys(props)
        .filter(isListener)
        .forEach(name => {
          const eventType = name.toLowerCase().substring(2);
          dom.addEventListener(eventType, props[name]);
        });
      const isAttribute = name => !isListener(name) && name !== "children";
      Object.keys(props)
        .filter(isAttribute)
        .forEach(name => {
          dom[name] = props[name];
        });
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
