import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { SMixinFlexColumn } from "../../../@core/styles/emotion";
import { LayerBar } from "./LayerBar.tsx";
import { PropertyBar } from "./PropertyBar.tsx";

interface Props {}

export function RightPanel({}: Props) {
  return (
    <Div>
      <Panel>
        <PropertyBar />
        <LayerBar />
      </Panel>
    </Div>
  );
}

const Div = styled.div`
  padding-left: 16px;
  width: 240px;
  ${SMixinFlexColumn("stretch", "stretch")};
`;

const Panel = styled.div`
  flex: 1;

  ${({ theme }) => {
    return css`
      border: 1px solid ${theme.axf_border_color};
      background: ${theme.form_box_bg};
      box-shadow: ${theme.box_shadow_base};
      border-radius: 4px;
      padding: 10px;
    `;
  }}
`;
