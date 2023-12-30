interface PanelPosition {
  x: number;
  y: number;
}

type ToolType = "SELECTOR" | "TEXT" | "FRAME" | "IMG";
type LayerState = "hover" | "selected";

interface DivLayer {
  id: string;
  type: ToolType;
  name: string;
  left: number;
  top: number;
  width: number;
  height: number;
  children?: DivLayer[];
  state?: LayerState;
}
