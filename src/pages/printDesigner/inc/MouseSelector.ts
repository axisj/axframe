export interface SelectorInfo {
  left: number;
  top: number;
  width: number;
  height: number;
}
export class MouseSelector {
  div: HTMLDivElement;
  startX: number;
  startY: number;
  active: boolean;
  appended: boolean;

  constructor() {
    this.div = document.createElement("div");
    this.div.className = "tool-selector";
    this.startX = 0;
    this.startY = 0;
    this.active = false;
    this.appended = false;
  }

  setStartPoint(x: number, y: number) {
    this.startX = x;
    this.startY = y;

    this.div.style.left = `${x}px`;
    this.div.style.top = `${y}px`;
    this.div.style.width = `${0}px`;
    this.div.style.height = `${0}px`;
    this.active = true;
  }

  setEndPoint(x: number, y: number) {
    if (x < this.startX) {
      this.div.style.left = `${x}px`;
      this.div.style.width = `${this.startX - x}px`;
    } else {
      this.div.style.width = `${x - this.startX}px`;
    }

    if (y < this.startY) {
      this.div.style.top = `${y}px`;
      this.div.style.height = `${this.startY - y}px`;
    } else {
      this.div.style.height = `${y - this.startY}px`;
    }
  }

  setAppend(append: boolean) {
    this.appended = append;
  }

  setActive(active: boolean) {
    this.active = active;
  }

  getInfo(): SelectorInfo {
    return {
      left: parseInt(this.div.style.left),
      top: parseInt(this.div.style.top),
      width: parseInt(this.div.style.width),
      height: parseInt(this.div.style.height),
    };
  }
}
