
export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  // Метод, который добавляет элемент в контейнер
  addItem(element) {
    this._container.append(element);
  }


}
