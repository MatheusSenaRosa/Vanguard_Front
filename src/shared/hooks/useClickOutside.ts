import { RefObject, useCallback, useEffect } from "react";

export const useClickOutside = (elementRef: RefObject<HTMLElement>, handler: () => void) => {
  const onClickOutside = useCallback(
    (e: MouseEvent) => {
      const isOutside = !elementRef.current?.contains(e.target as Node);

      if (isOutside) handler();
    },
    [elementRef, handler],
  );

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [onClickOutside]);
};
