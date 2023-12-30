import * as React from "react";
import styled from "@emotion/styled";
import { usePrintDesignerStore } from "../usePrintDesignerStore.ts";

interface Props {}

export function NodeHoverView({}: Props) {
  const divLayers = usePrintDesignerStore((s) => s.divLayers);
  const hoverLayerIndex = usePrintDesignerStore((s) => s.hoverLayerIndex);

  const hoverLayer = React.useMemo(() => {
    if (hoverLayerIndex > -1) {
      return divLayers[hoverLayerIndex];
    }
    return null;
  }, [divLayers, hoverLayerIndex]);

  if (hoverLayer) {
    return (
      <Div
        className={"node-hover"}
        style={{
          left: hoverLayer.left,
          top: hoverLayer.top,
          width: hoverLayer.width,
          height: hoverLayer.height,
        }}
      />
    );
  }

  return null;
}

const Div = styled.div``;
