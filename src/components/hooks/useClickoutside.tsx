import { useCallback, useEffect, useRef } from "react";

const useClickOutside = (callback: unknown) => {
  const currentRef = useRef<HTMLDivElement>(null);

  const checkParent = (t: { parentNode: any }, elm: HTMLDivElement | null) => {
    while (t.parentNode) {
      if (t === elm) {
        return true;
      }
      t = t.parentNode;
    }
    return false;
  };

  const check = useCallback(
    (e: { target: any; srcElement: any }) => {
      const target = (e && e.target) || (e && e.srcElement);

      if (!checkParent(target, currentRef.current)) {
        // @ts-ignore
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    document.addEventListener("click", check, true);

    return () => {
      document.removeEventListener("click", check, true);
    };
  }, [check]);

  return currentRef;
};

export default useClickOutside;
