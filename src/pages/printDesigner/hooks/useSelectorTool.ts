import { RefObject, useEffect } from "react";
import { usePrintDesignerStore } from "../usePrintDesignerStore";
import { MouseSelector } from "../inc/MouseSelector";
import { getRelativePosition } from "../inc/getRelativePosition";
import { findDivLayer, findDivLayers } from "../inc/findDivLayer.ts";

export function useSelectorTool(divRef: RefObject<HTMLDivElement>) {
  const toolSelected = usePrintDesignerStore((s) => s.toolSelected);
  const divLayers = usePrintDesignerStore((s) => s.divLayers);
  const setLayer = usePrintDesignerStore((s) => s.setLayer);
  const setHoverLayerIndex = usePrintDesignerStore((s) => s.setHoverLayerIndex);
  const setSelectedLayerIndexes = usePrintDesignerStore((s) => s.setSelectedLayerIndexes);

  useEffect(() => {
    if (!divRef.current) return;

    const div = divRef.current;
    const selector = new MouseSelector();

    const handleMouseDown = (e: MouseEvent) => {
      if (toolSelected !== "SELECTOR") return;

      const { x, y } = getRelativePosition(div, e);
      selector.setStartPoint(x, y);

      if (e.target instanceof HTMLDivElement) {
        const role = e.target.getAttribute("aria-controls");
        if (role) {
          return;
        }
      }

      const { layerIndex } = findDivLayer(divLayers, x, y);
      if (layerIndex > -1) {
        selector.setActive(false);
        setSelectedLayerIndexes([layerIndex]);
      } else {
        setSelectedLayerIndexes([]);
      }

      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = getRelativePosition(div, e);

      if (selector.active) {
        if (!selector.appended) {
          selector.setAppend(true);
          div.appendChild(selector.div);
        }
        selector.setEndPoint(x, y);

        const selectorInfo = selector.getInfo();
        const selectedLayerIndexes = findDivLayers(divLayers, selectorInfo);
        setSelectedLayerIndexes(selectedLayerIndexes);
      } else {
        const { layerIndex } = findDivLayer(divLayers, x, y);
        setHoverLayerIndex(layerIndex);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      document.removeEventListener("mouseup", handleMouseUp);
      if (selector.appended) {
        div.removeChild(selector.div);
        selector.setAppend(false);
      }
      selector.setActive(false);
    };

    div.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      div.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [divLayers, divRef, setHoverLayerIndex, setLayer, setSelectedLayerIndexes, toolSelected]);

  return;
}
