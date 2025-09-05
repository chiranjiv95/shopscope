import { useRef } from "react";

export function useRenderCount(name) {
  const renders = useRef(0);
  renders.current++;
  console.log(`${name} renders:`, renders.current);

  return renders.current;
}
