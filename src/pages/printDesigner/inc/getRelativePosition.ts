export function getRelativePosition(div: HTMLDivElement, e: MouseEvent) {
  const { clientX, clientY } = e;
  const { left, top } = div.getBoundingClientRect();
  return {
    x: clientX - left,
    y: clientY - top,
  };
}
