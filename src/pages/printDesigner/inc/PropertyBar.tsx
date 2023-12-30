import styled from "@emotion/styled";
import Draggable from "react-draggable";
import { usePrintDesignerStore } from "../usePrintDesignerStore.ts";
import { PropertyForm } from "./PropertyForm.tsx";

interface Props {}

export function PropertyBar({}: Props) {
  const [propertyPanelPosition, setPropertyPanelPosition] = usePrintDesignerStore((s) => [
    s.propertyPanelPosition,
    s.setPropertyPanelPosition,
    s.selectedLayerIndexes,
  ]);

  return (
    <Draggable
      bounds='parent'
      handle='.handle'
      position={propertyPanelPosition}
      onStop={(e, data) => {
        setPropertyPanelPosition({
          x: data.x,
          y: data.y,
        });
      }}
    >
      <Container>
        <Header className={"handle"}>Property</Header>
        <Body>
          <PropertyForm />
        </Body>
      </Container>
    </Draggable>
  );
}

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  border: 1px solid var(--panel-border-color);
  border-radius: 5px;
`;

const Header = styled.div`
  background: var(--panel-header-bg);
  color: var(--panel-header-color);
  cursor: grab;
  padding: 4px 10px;
  font-size: 12px;
`;

const Body = styled.div`
  background: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 180px;
  padding: 10px;
  min-height: 100px;
  max-height: 800px;
  overflow: auto;
`;
