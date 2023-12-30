import { RefObject, useEffect } from "react";
import { usePrintDesignerStore } from "../usePrintDesignerStore";
import { NodeResizer } from "../inc/NodeResizer";
import { v4 as uuidv4 } from "uuid";
import { getRelativePosition } from "../inc/getRelativePosition";

export function useResizerTool(divRef: RefObject<HTMLDivElement>) {
  const toolSelected = usePrintDesignerStore((s) => s.toolSelected);
  const appendLayer = usePrintDesignerStore((s) => s.appendLayer);
  const setToolSelected = usePrintDesignerStore((s) => s.setToolSelected);

  useEffect(() => {
    if (!divRef.current) return;

    const div = divRef.current;
    const selector = new NodeResizer();

    const handleMouseDown = (e: MouseEvent) => {
      if (!divRef.current) return;
      if (toolSelected === "SELECTOR") return;

      div.appendChild(selector.div);
      const { x, y } = getRelativePosition(div, e);
      selector.setStartPoint(x, y);

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;

      if (selector.active) {
        const { x, y } = getRelativePosition(div, e);
        selector.setEndPoint(x, y);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!divRef.current) return;

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      div.removeChild(selector.div);

      const info = selector.getInfo();

      if (info.width && info.height) {
        appendLayer({
          id: uuidv4(),
          type: toolSelected,
          name: "New Layer",
          left: info.left,
          top: info.top,
          width: info.width,
          height: info.height,
        });
      }

      setToolSelected("SELECTOR");
    };

    div.addEventListener("mousedown", handleMouseDown);

    return () => {
      div.removeEventListener("mousedown", handleMouseDown);
    };
  }, [appendLayer, divRef, setToolSelected, toolSelected]);

  return;
}
