import styled from "@emotion/styled";
import * as React from "react";
import { SMixinFlexColumn, SMixinFlexRow } from "@core/styles/emotion";
import { PrintPage } from "./inc/PrintPage";
import { PrintPageHeader } from "./inc/PrintPageHeader.tsx";
import { RightPanel } from "./inc/RightPanel.tsx";
import { ToolBar } from "./inc/ToolBar";

interface Props {}

export function PrintDesigner({}: Props) {
  return (
    <PrintDesignerRoot>
      <PrintPageBlock>
        <PrintPageHeader />
        <ScrollBody>
          <PrintPage />
        </ScrollBody>
        <ToolBar />
      </PrintPageBlock>
      <RightPanel />
    </PrintDesignerRoot>
  );
}

const PrintDesignerRoot = styled.div`
  ${SMixinFlexRow("stretch", "stretch")};
  flex: 1;
  overflow: hidden;
`;
const PrintPageBlock = styled.div`
  position: relative;
  ${SMixinFlexColumn("stretch", "stretch")};
  flex: 1;
  border: 1px solid ${(p) => p.theme.axf_border_color};
  border-radius: 5px;
  overflow: hidden;
`;
const ScrollBody = styled.div`
  flex: 1;
  position: relative;
  overflow: auto;
  padding: 16px;
`;