import styled from "@emotion/styled";
import { SMixinFlexRow } from "../../../@core/styles/emotion";

interface Props {}

export function PrintPageHeader({}: Props) {
  return <Div>페이지 타이틀</Div>;
}

const Div = styled.div`
  ${SMixinFlexRow("center", "center")};
  cursor: grab;
  padding: 7px 10px;
  background: ${(p) => p.theme.form_box_bg};
  border-bottom: 1px solid ${(p) => p.theme.axf_border_color};
  font-weight: bold;
`;
