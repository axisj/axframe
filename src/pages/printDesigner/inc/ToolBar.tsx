import styled from "@emotion/styled";
import Draggable from "react-draggable";
import { usePrintDesignerStore } from "../usePrintDesignerStore.ts";
import { IconCursor, IconFrame, IconImage, IconText } from "components/icon";
import { SMixinFlexColumn, SMixinFlexRow } from "../../../@core/styles/emotion";
import { css } from "@emotion/react";
import { ReactElement, useCallback } from "react";

interface Props {}

const tools: { type: ToolType; label: ReactElement }[] = [
  {
    type: "SELECTOR",
    label: <IconCursor />,
  },
  {
    type: "TEXT",
    label: <IconText />,
  },
  {
    type: "FRAME",
    label: <IconFrame />,
  },
  {
    type: "IMG",
    label: <IconImage />,
  },
];

export function ToolBar({}: Props) {
  const [toolPanelPosition, setToolPanelPosition, toolSelected, setToolSelected] = usePrintDesignerStore((s) => [
    s.toolPanelPosition,
    s.setToolPanelPosition,
    s.toolSelected,
    s.setToolSelected,
  ]);

  const onClickTool = useCallback(
    async (toolType: ToolType) => {
      setToolSelected(toolType);
    },
    [setToolSelected],
  );

  return (
    <Draggable
      bounds='parent'
      handle='.handle'
      position={toolPanelPosition}
      onStop={(e, data) => {
        setToolPanelPosition({
          x: data.x,
          y: data.y,
        });
      }}
    >
      <Container>
        <Header className={"handle"}></Header>
        <Body>
          {tools.map((tool, key) => (
            <Tool onClick={() => onClickTool(tool.type)} active={toolSelected === tool.type} key={key}>
              {tool.label}
            </Tool>
          ))}
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
  padding: 7px 10px;
`;

const toolWidth = 26;
const gutter = 5;

const Body = styled.div`
  ${SMixinFlexRow("stretch", "center", "wrap")};
  background: #dfdfdf;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  width: ${toolWidth * 2 + gutter * 3}px;
  padding: ${gutter}px;
  gap: ${gutter}px;
`;
const Tool = styled.div<{ active?: boolean }>`
  ${SMixinFlexColumn("center", "center")};
  font-size: 20px;
  width: ${toolWidth}px;
  height: ${toolWidth}px;
  border-radius: 2px;
  color: var(--panel-tool-color);
  &:hover {
    background: #fff;
  }
  ${({ active }) => {
    if (active) {
      return css`
        background: #fff;
      `;
    }
  }}
`;
