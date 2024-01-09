import { SelectorInfo } from "./MouseSelector.ts";

interface FindDivLayerOptions {
  ex: number;
  ey: number;
}

export function findDivLayer(divLayers: DivLayer[], sx: number, sy: number, options?: FindDivLayerOptions) {
  // find layer
  let layerIndex = -1;

  for (let i = divLayers.length - 1; i >= 0; i--) {
    const { left, top, width, height } = divLayers[i];
    const ex = options?.ex ?? 0;
    const ey = options?.ey ?? 0;
    if (sx >= left - ex && sx <= left + width + ex && sy >= top - ey && sy <= top + height + ey) {
      layerIndex = i;
      break;
    }
  }

  return {
    layerIndex,
    divLayer: layerIndex > -1 ? divLayers[layerIndex] : undefined,
  };
}

export function findDivLayers(divLayers: DivLayer[], selectorInfo: SelectorInfo) {
  const { left, top, width, height } = selectorInfo;

  const selectedLayerIndexes: number[] = [];

  for (let i = 0; i < divLayers.length; i++) {
    const { left: l, top: t, width: w, height: h } = divLayers[i];
    if (l >= left && l + w <= left + width && t >= top && t + h <= top + height) {
      selectedLayerIndexes.push(i);
    }
  }

  return selectedLayerIndexes;
}