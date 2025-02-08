import { useCallback, useEffect } from "react";

const defaultBox = () => ({
  width: 0,
  height: 0,
});

type Box = ReturnType<typeof defaultBox>;
type BoxKeys = keyof Box;
type Watch = BoxKeys | "all";
type Params = [Watch, (box: Box) => void] | [];
type Ref = Element | null;

let ref: Ref = null;
let observer: ResizeObserver | null = null;
let prevBox = defaultBox();
let nextBox = defaultBox();
let debug: string | undefined;

export default function useBoxSize(...[watch, callback]: Params) {
  const log = useCallback((action: string, data?: unknown) => {
    if (debug) console.log(debug + ":" + action, { data });
  }, []);
  const unSet = useCallback(() => {
    log("unSet", ref);

    observer?.disconnect();
    observer = null;
    ref = null;
    prevBox = defaultBox();
    nextBox = defaultBox();
  }, []);

  const set = useCallback((element: Ref) => {
    if (!element || element === ref) return;
    log("set", element);
    ref = element;

    observer = new ResizeObserver((e) => {
      const box = e[0].borderBoxSize[0];

      prevBox = { ...nextBox };
      nextBox = {
        width: box.inlineSize,
        height: box.blockSize,
      };

      log("observe", { observer, prevBox, nextBox });

      if (!watch || !callback) return;

      const trigger = (key: BoxKeys) =>
        ["all", key].includes(watch) && prevBox[key] !== nextBox[key];

      if (trigger("width") || trigger("height")) {
        log("trigger", { nextBox });
        callback(nextBox);
      }
    });

    observer.observe(ref);
  }, []);

  const get = useCallback((key: BoxKeys) => nextBox[key], []);
  const getPrevious = useCallback((key: BoxKeys) => prevBox[key], []);
  const setDebug = useCallback((prefix?: string) => (debug = prefix), []);

  useEffect(() => {
    log("Mount");

    return () => {
      log("Unmount");
      unSet();
    };
  }, []);
  return { set, unSet, get, getPrevious, setDebug };
}
