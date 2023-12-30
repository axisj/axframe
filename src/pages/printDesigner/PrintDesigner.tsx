import * as React from "react";
import styled from "@emotion/styled";
import { SMixinFlexColumn } from "../../@core/styles/emotion";
import { PrintPage } from "./inc/PrintPage";
import { ToolBar } from "./inc/ToolBar";
import { LayerBar } from "./inc/LayerBar";
import { PropertyBar } from "./inc/PropertyBar.tsx";

interface Props {}

export function PrintDesigner({}: Props) {
  return (
    <PrintDesignerRoot>
      <Frame>
        <PrintPage />
        <ToolBar />
        <LayerBar />
        <PropertyBar />
      </Frame>
    </PrintDesignerRoot>
  );
}

const PrintDesignerRoot = styled.div`
  ${SMixinFlexColumn("stretch", "stretch")};
  flex: 1;
  padding: 16px;
  overflow: auto;
`;
const Frame = styled.div`
  flex: 1;
  position: relative;
`;
