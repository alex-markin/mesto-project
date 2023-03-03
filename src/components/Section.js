export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedData = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._renderedData.forEach((item) => {
      this._renderer(item);
    });
  }

  // Метод, который добавляет элемент в контейнер (в конец)
  appendItem(element) {
    this._container.append(element);
  }

  // Метод, который добавляет элемент в контейнер (в начало)
  prependItem(element) {
    this._container.prepend(element);
  }
}
