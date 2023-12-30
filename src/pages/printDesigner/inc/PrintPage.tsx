import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useSelectorTool } from "../hooks/useSelectorTool.ts";
import { useResizerTool } from "../hooks/useResizerTool.ts";
import { usePrintDesignerStore } from "../usePrintDesignerStore.ts";
import { NodeResizerView } from "./NodeResizerView.tsx";
import { NodeHoverView } from "./NodeHoverView.tsx";

interface Props {}

export function PrintPage({}: Props) {
  const divLayers = usePrintDesignerStore((s) => s.divLayers);
  const setPageDivRef = usePrintDesignerStore((s) => s.setPageDivRef);
  const divRef = useRef<HTMLDivElement>(null);
  useSelectorTool(divRef);
  useResizerTool(divRef);

  useEffect(() => {
    if (divRef.current) setPageDivRef(divRef.current);
  }, [setPageDivRef]);

  return (
    <Div ref={divRef}>
      {divLayers.map((divLayer) => {
        return (
          <div
            key={divLayer.id}
            className={"div-layer div-layer-" + divLayer.type.toLowerCase()}
            style={{
              left: divLayer.left,
              top: divLayer.top,
              width: divLayer.width,
              height: divLayer.height,
            }}
          />
        );
      })}

      <NodeHoverView />
      <NodeResizerView />
    </Div>
  );
}

const Div = styled.div`
  background: #fff;
  position: relative;
  width: 595px;
  height: 842px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;

  .div-layer {
    position: absolute;
  }
  .div-layer-text {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='2' stroke-dasharray='1%2c 10' stroke-dashoffset='27' stroke-linecap='square'/%3e%3c/svg%3e");
  }

  .tool-selector {
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid var(--panel-edit-color);
    background: var(--panel-edit-bg);
  }

  .node-hover {
    position: absolute;
    border: 1px solid var(--panel-edit-color);
    background: transparent;
  }
  .node-resizer {
    position: absolute;
    border: 1px solid var(--panel-edit-color);
    background: transparent;
    cursor: move;

    [aria-controls] {
      position: absolute;
      width: 7px;
      height: 7px;
    }
    [aria-controls="lt"],
    [aria-controls="rt"],
    [aria-controls="lb"],
    [aria-controls="rb"] {
      background: #fff;
      border: 1px solid var(--panel-edit-color);
    }
    [aria-controls="lt"] {
      left: 0;
      top: 0;
      transform: translate(-50%, -50%);
      cursor: nwse-resize;
    }
    [aria-controls="rt"] {
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
      cursor: nesw-resize;
      background: #fff;
      border: 1px solid var(--panel-edit-color);
    }
    [aria-controls="lb"] {
      left: 0;
      bottom: 0;
      transform: translate(-50%, 50%);
      cursor: nesw-resize;
    }
    [aria-controls="rb"] {
      right: 0;
      bottom: 0;
      transform: translate(50%, 50%);
      cursor: nwse-resize;
    }
    [aria-controls="t"] {
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
      cursor: ns-resize;
      width: 100%;
    }
    [aria-controls="r"] {
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
      cursor: ew-resize;
      height: 100%;
    }
    [aria-controls="b"] {
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
      cursor: ns-resize;
      width: 100%;
    }
    [aria-controls="l"] {
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: ew-resize;
      height: 100%;
    }
  }
`;
