import React, { RefObject, useEffect } from "react";
import { usePrintDesignerStore } from "../usePrintDesignerStore";
import { MouseSelector } from "../inc/MouseSelector";
import { getRelativePosition } from "../inc/getRelativePosition";
import { findDivLayer, findDivLayers } from "../inc/findDivLayer.ts";

const selector = new MouseSelector();
export function useSelectorTool(divRef: RefObject<HTMLDivElement>) {
  const toolSelected = usePrintDesignerStore((s) => s.toolSelected);
  const divLayers = usePrintDesignerStore((s) => s.divLayers);
  const setLayer = usePrintDesignerStore((s) => s.setLayer);
  const setHoverLayerIndex = usePrintDesignerStore((s) => s.setHoverLayerIndex);
  const setSelectedLayerIndexes = usePrintDesignerStore((s) => s.setSelectedLayerIndexes);

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!divRef.current) return;
      const { x, y } = getRelativePosition(divRef.current, e);

      // console.log("append selector, selector.active =", selector.active, "selector.appended = ", selector.appended);

      if (selector.active) {
        if (!selector.appended) {
          selector.setAppend(true);
          divRef.current.appendChild(selector.div);
        }
        selector.setEndPoint(x, y);

        const selectorInfo = selector.getInfo();
        const selectedLayerIndexes = findDivLayers(divLayers, selectorInfo);
        setSelectedLayerIndexes(selectedLayerIndexes);
      } else {
        const { layerIndex } = findDivLayer(divLayers, x, y);
        setHoverLayerIndex(layerIndex);
      }
    },
    [divLayers, divRef, setHoverLayerIndex, setSelectedLayerIndexes],
  );

  const handleMouseUp = React.useCallback(
    (e: MouseEvent) => {
      document.removeEventListener("mouseup", handleMouseUp);
      if (selector.appended) {
        divRef.current?.removeChild(selector.div);
        selector.setAppend(false);
      }
      selector.setActive(false);
    },
    [divRef],
  );

  const handleMouseDown = React.useCallback(
    (e: MouseEvent) => {
      if (!divRef.current) return;

      if (e.target instanceof HTMLDivElement) {
        const role = e.target.getAttribute("aria-controls");
        if (role) {
          return;
        }
      }

      const { x, y } = getRelativePosition(divRef.current, e);
      selector.setStartPoint(x, y);

      const { layerIndex } = findDivLayer(divLayers, x, y);
      if (layerIndex > -1) {
        selector.setActive(false);
        setSelectedLayerIndexes([layerIndex]);
      } else {
        setSelectedLayerIndexes([]);
      }

      document.addEventListener("mouseup", handleMouseUp);
    },
    [divLayers, divRef, handleMouseUp, setSelectedLayerIndexes],
  );

  useEffect(() => {
    if (toolSelected !== "SELECTOR") return;

    divRef.current?.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      divRef.current?.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    divLayers,
    divRef,
    handleMouseDown,
    handleMouseMove,
    setHoverLayerIndex,
    setLayer,
    setSelectedLayerIndexes,
    toolSelected,
  ]);

  return;
}
