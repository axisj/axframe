import styled from "@emotion/styled";
import { SMixinFlexColumn } from "../../../@core/styles/emotion";
import { usePrintDesignerStore } from "../usePrintDesignerStore.ts";
import { PropertyForm } from "./PropertyForm.tsx";

interface Props {}

export function PropertyBar({}: Props) {
  const [selectedLayerIndexes] = usePrintDesignerStore((s) => [s.selectedLayerIndexes]);

  return (
    <Container>
      <Header className={"handle"}>Property</Header>
      <Body>
        <PropertyForm />
      </Body>
    </Container>
  );
}

const Container = styled.div`
  ${SMixinFlexColumn("stretch", "stretch")};
  flex: 1;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 8px 10px;
  font-size: 12px;
  font-weight: bold;
  border-bottom: 1px solid ${(p) => p.theme.axf_border_color};
`;

const Body = styled.div`
  background: #fff;
  padding: 10px;
  overflow: auto;
`;
