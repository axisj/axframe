import * as React from "react";
import styled from "@emotion/styled";
import { usePrintDesignerStore } from "../usePrintDesignerStore.ts";
import { useEffect, useRef } from "react";
import { getRelativePosition } from "./getRelativePosition.ts";

interface Props {}

export function NodeResizerView({}: Props) {
  const divLayers = usePrintDesignerStore((s) => s.divLayers);
  const selectedLayerIndexes = usePrintDesignerStore((s) => s.selectedLayerIndexes);
  const setLayer = usePrintDesignerStore((s) => s.setLayer);
  const pageDivRef = usePrintDesignerStore((s) => s.pageDivRef);
  const [position, setPosition] = React.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  const selectedLayer = React.useMemo(() => {
    if (selectedLayerIndexes.length === 0) {
      return null;
    }
    return selectedLayerIndexes.reduce(
      (acc, cur) => {
        return {
          left: Math.min(acc.left, divLayers[cur].left),
          top: Math.min(acc.top, divLayers[cur].top),
          width: Math.max(acc.width, divLayers[cur].left + divLayers[cur].width),
          height: Math.max(acc.height, divLayers[cur].top + divLayers[cur].height),
        };
      },
      { left: Infinity, top: Infinity, width: 0, height: 0 },
    );
  }, [divLayers, selectedLayerIndexes]);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!pageDivRef) return;

      const { x: mouseDownX, y: mouseDownY } = getRelativePosition(pageDivRef, e.nativeEvent);

      let role = "";
      if (e.target instanceof HTMLDivElement) {
        role = e.target.getAttribute("aria-controls") ?? "";
      }

      const _data = {
        role,
        gapX: mouseDownX - position.left,
        gapY: mouseDownY - position.top,
        ...position,
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!pageDivRef) return;
        const { x, y } = getRelativePosition(pageDivRef, e);
        const { role, gapX: _gapX, gapY: _gapY, ..._position } = _data;
        function updatePosition(position: typeof _position) {
          setPosition(position);
          selectedLayerIndexes.forEach((index) => {
            setLayer(index, { ...position });
          });
        }

        switch (role) {
          case "lt": {
            updatePosition({
              left: x,
              top: y,
              width: _position.width + _position.left - x,
              height: _position.height + _position.top - y,
            });
            break;
          }
          case "rt": {
            updatePosition({
              left: _position.left,
              top: y,
              width: x - _position.left,
              height: _position.height + _position.top - y,
            });
            break;
          }
          case "lb": {
            updatePosition({
              left: x,
              top: _position.top,
              width: _position.width + _position.left - x,
              height: y - _position.top,
            });
            break;
          }
          case "rb": {
            updatePosition({
              left: _position.left,
              top: _position.top,
              width: x - _position.left,
              height: y - _position.top,
            });
            break;
          }
          case "t": {
            updatePosition({
              left: _position.left,
              top: y,
              width: _position.width,
              height: _position.height + _position.top - y,
            });
            break;
          }
          case "r": {
            updatePosition({
              left: _position.left,
              top: _position.top,
              width: x - _position.left,
              height: _position.height,
            });
            break;
          }
          case "b": {
            updatePosition({
              left: _position.left,
              top: _position.top,
              width: _position.width,
              height: y - _position.top,
            });
            break;
          }
          case "l": {
            updatePosition({
              left: x,
              top: _position.top,
              width: _position.width + _position.left - x,
              height: _position.height,
            });
            break;
          }
          default: {
            updatePosition({
              left: _position.left + x - _position.left - _gapX,
              top: _position.top + y - _position.top - _gapY,
              width: _position.width,
              height: _position.height,
            });
            break;
          }
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [pageDivRef, position, selectedLayerIndexes, setLayer],
  );

  useEffect(() => {
    if (selectedLayer) {
      setPosition({
        left: selectedLayer.left,
        top: selectedLayer.top,
        width: selectedLayer.width - selectedLayer.left,
        height: selectedLayer.height - selectedLayer.top,
      });
    }
  }, [selectedLayer]);

  if (selectedLayer) {
    return (
      <Div className={"node-resizer"} style={position} onMouseDown={handleMouseDown}>
        <div aria-controls={"l"} />
        <div aria-controls={"t"} />
        <div aria-controls={"r"} />
        <div aria-controls={"b"} />
        <div aria-controls={"lt"} />
        <div aria-controls={"rt"} />
        <div aria-controls={"lb"} />
        <div aria-controls={"rb"} />
      </Div>
    );
  }

  return null;
}

const Div = styled.div``;
