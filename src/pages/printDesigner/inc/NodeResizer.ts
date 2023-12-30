import { MouseSelector } from "./MouseSelector.ts";

export class NodeResizer extends MouseSelector {
  constructor() {
    super();

    this.div.className = "node-resizer";

    const ltPoint = document.createElement("div");
    ltPoint.setAttribute("role", "lt");
    const rtPoint = document.createElement("div");
    rtPoint.setAttribute("role", "rt");
    const lbPoint = document.createElement("div");
    lbPoint.setAttribute("role", "lb");
    const rbPoint = document.createElement("div");
    rbPoint.setAttribute("role", "rb");

    this.div.appendChild(ltPoint);
    this.div.appendChild(rtPoint);
    this.div.appendChild(lbPoint);
    this.div.appendChild(rbPoint);
  }
}
