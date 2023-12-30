import styled from "@emotion/styled";
import Draggable from "react-draggable";
import { usePrintDesignerStore } from "../usePrintDesignerStore.ts";
import { SMixinFlexRow } from "../../../@core/styles/emotion";
import { IconFrame, IconImage, IconText } from "../../../components/icon";
import { css } from "@emotion/react";

interface Props {}

const ToolIcon = {
  TEXT: <IconText />,
  FRAME: <IconFrame />,
  IMG: <IconImage />,
};

export function LayerBar({}: Props) {
  const [layerPanelPosition, setLayerPanelPosition, selectedLayerIndexes, hoverLayerIndex] = usePrintDesignerStore(
    (s) => [s.layerPanelPosition, s.setLayerPanelPosition, s.selectedLayerIndexes, s.hoverLayerIndex],
  );
  const divLayers = usePrintDesignerStore((s) => s.divLayers);

  return (
    <Draggable
      bounds='parent'
      handle='.handle'
      position={layerPanelPosition}
      onStop={(e, data) => {
        setLayerPanelPosition({
          x: data.x,
          y: data.y,
        });
      }}
    >
      <Container>
        <Header className={"handle"}>Layers</Header>
        <Body>
          {divLayers.map((divLayer, key) => {
            return (
              <LayerItem key={key} hover={hoverLayerIndex === key} selected={selectedLayerIndexes.includes(key)}>
                {ToolIcon[divLayer.type]}
                {divLayer.name}
              </LayerItem>
            );
          })}
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
  width: 200px;
  padding: 0;
  min-height: 100px;
  max-height: 800px;
  overflow: auto;
`;

const LayerItem = styled.div<{ hover?: boolean; selected?: boolean }>`
  ${SMixinFlexRow("stretch", "center")};
  padding: 7px 10px;
  gap: 5px;

  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;

  ${({ selected }) => {
    if (selected) {
      return css`
        background: var(--panel-edit-bg);
        border-color: var(--panel-edit-bg);
      `;
    }
  }}

  ${({ hover }) => {
    if (hover) {
      return css`
        border-color: var(--panel-edit-color);
      `;
    }
  }}
    
  &:hover {
    border: 1px solid var(--panel-edit-color);
  }
`;
