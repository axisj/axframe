import styled from "@emotion/styled";
import { SMixinFlexRow } from "../../../@core/styles/emotion";

interface Props {}

export function PrintPageHeader({}: Props) {
  return <Div>페이지 타이틀</Div>;
}

const Div = styled.div`
  background: var(--panel-header-bg);
  color: var(--panel-header-color);
  cursor: grab;
  padding: 7px 10px;
  ${SMixinFlexRow("center", "center")};
`;
