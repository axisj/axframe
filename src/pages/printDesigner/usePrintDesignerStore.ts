import { create } from "zustand";
import { getMetaDataByPath, setMetaDataByPath } from "@core/stores/usePageTabStore";
import { subscribeWithSelector } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { StoreActions } from "@core/stores/types";
import { ProgramFn } from "@types";
import { ROUTES } from "../../router";

interface MetaData {
  programFn?: ProgramFn;
  toolPanelPosition: PanelPosition;
  layerPanelPosition: PanelPosition;
  propertyPanelPosition: PanelPosition;
  divLayers: DivLayer[];
}

interface States extends MetaData {
  routePath: string; // initialized Store;
  toolSelected: ToolType;
  selectedLayerIndexes: number[];
  hoverLayerIndex: number;
  pageDivRef?: HTMLDivElement;
}

interface Actions {
  init: (id: number, routerPath: string, params?: Record<string, any>) => Promise<void>;
  reset: () => void;
  setPageDivRef: (ref: HTMLDivElement) => void;
  setToolPanelPosition: (toolPanelPosition: PanelPosition) => void;
  setToolSelected: (toolSelected?: ToolType) => void;
  setLayerPanelPosition: (layerPanelPosition: PanelPosition) => void;
  setPropertyPanelPosition: (propertyPanelPosition: PanelPosition) => void;
  appendLayer: (layer: DivLayer) => void;
  setLayer: (index: number, layer: Partial<DivLayer>) => void;
  setSelectedLayerIndexes: (indexes: number[]) => void;
  setHoverLayerIndex: (index?: number) => void;
}

// create states
const createState: States = {
  routePath: ROUTES.PRINT_DESIGNER.path,
  toolPanelPosition: {
    x: 40,
    y: 50,
  },
  toolSelected: "SELECTOR",
  layerPanelPosition: {
    x: 0,
    y: 100,
  },
  propertyPanelPosition: {
    x: 900,
    y: 0,
  },
  divLayers: [],
  selectedLayerIndexes: [],
  hoverLayerIndex: -1,
};

// create actions
let unsub: any;
const createActions: StoreActions<States & Actions, Actions> = (set, get) => ({
  init: async (id, routerPath, params) => {
    if (unsub) unsub();

    const s = getMetaDataByPath<MetaData>(routerPath) ?? createState;

    if (s) {
      const metaData: MetaData = {
        programFn: s.programFn,
        toolPanelPosition: s.toolPanelPosition,
        layerPanelPosition: s.layerPanelPosition,
        propertyPanelPosition: s.propertyPanelPosition,
        divLayers: s.divLayers,
      };
      set(metaData);
    } else {
      set({
        ...createState,
      });
    }

    unsub = usePrintDesignerStore.subscribe(
      (s): MetaData => ({
        programFn: s.programFn,
        toolPanelPosition: s.toolPanelPosition,
        layerPanelPosition: s.layerPanelPosition,
        propertyPanelPosition: s.propertyPanelPosition,
        divLayers: s.divLayers,
      }),
      (data) => {
        setMetaDataByPath<MetaData>(routerPath, data);
      },
      { equalityFn: shallow },
    );
  },
  reset(): void {
    set(createState);
  },
  setPageDivRef: (ref) => set({ pageDivRef: ref }),
  // tool
  setToolPanelPosition: (toolPanelPosition) => set({ toolPanelPosition }),
  setToolSelected: (toolSelected) => set({ toolSelected }),

  // layer
  setLayerPanelPosition: (layerPanelPosition) => set({ layerPanelPosition }),

  // property
  setPropertyPanelPosition: (propertyPanelPosition) => set({ propertyPanelPosition }),

  appendLayer: (layer) => {
    set({
      divLayers: [...get().divLayers, layer],
    });
  },
  setLayer: (index, layer) => {
    const divLayers = get().divLayers;
    divLayers[index] = {
      ...divLayers[index],
      ...layer,
    };
    set({ divLayers: [...divLayers] });
  },
  setSelectedLayerIndexes: (indexes) => set({ selectedLayerIndexes: indexes }),
  setHoverLayerIndex: (index) => set({ hoverLayerIndex: index }),
});

// ---------------- exports
export interface printDesignerStore extends States, Actions {}

export const usePrintDesignerStore = create(
  subscribeWithSelector<printDesignerStore>((set, get) => ({
    ...createState,
    ...createActions(set, get),
  })),
);
