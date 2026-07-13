import { useEffect, useRef, type DependencyList, type EffectCallback } from "react";

export function useUpdateEffect(
  effect: EffectCallback,
  dependencies: DependencyList
) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return effect();
  }, dependencies);
}