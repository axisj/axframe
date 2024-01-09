import styled from "@emotion/styled";
import Draggable from "react-draggable";
import { usePrintDesignerStore } from "../usePrintDesignerStore.ts";
import { SMixinFlexColumn, SMixinFlexRow } from "../../../@core/styles/emotion";
import { IconFrame, IconImage, IconText } from "../../../components/icon";
import { css } from "@emotion/react";

interface Props {}

const ToolIcon = {
  TEXT: <IconText />,
  FRAME: <IconFrame />,
  IMG: <IconImage />,
};

export function LayerBar({}: Props) {
  const [selectedLayerIndexes, hoverLayerIndex] = usePrintDesignerStore((s) => [
    s.selectedLayerIndexes,
    s.hoverLayerIndex,
  ]);
  const divLayers = usePrintDesignerStore((s) => s.divLayers);

  return (
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
  border-top: 1px solid ${(p) => p.theme.axf_border_color};
  border-bottom: 1px solid ${(p) => p.theme.axf_border_color};
`;

const Body = styled.div`
  background: #fff;
  padding: 0;
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
