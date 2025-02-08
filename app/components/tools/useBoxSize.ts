import { useCallback, useEffect, useRef } from "react";

const defaultBox = () => ({
  width: 0,
  height: 0,
});

type Box = ReturnType<typeof defaultBox>;
type BoxKeys = keyof Box;
type Watch = BoxKeys | "all";
type Params = [Watch, (box: Box) => void] | [];
type Ref = Element | null;

type Store = {
  ref: Ref;
  observer: ResizeObserver | null;
  prevBox: Box;
  nextBox: Box;
  debug?: string;
};

const defaultStore = (): Store => ({
  ref: null,
  observer: null,
  prevBox: defaultBox(),
  nextBox: defaultBox(),
});

export default function useBoxSize(...[watch, callback]: Params) {
  let { current: _ } = useRef(defaultStore());

  const log = useCallback((action: string, data?: unknown) => {
    if (_.debug) console.log(_.debug + ":" + action, { data });
  }, []);
  const unSet = useCallback(() => {
    log("unSet", _.ref);

    _.observer?.disconnect();
    _ = defaultStore();
  }, []);

  const set = useCallback((element: Ref) => {
    if (!element || element === _.ref) return;
    log("set", element);
    _.ref = element;

    _.observer = new ResizeObserver((e) => {
      const box = e[0].borderBoxSize[0];

      _.prevBox = { ..._.nextBox };
      _.nextBox = {
        width: box.inlineSize,
        height: box.blockSize,
      };

      log("observe", { _ });

      if (!watch || !callback) return;

      const trigger = (key: BoxKeys) =>
        ["all", key].includes(watch) && _.prevBox[key] !== _.nextBox[key];

      if (trigger("width") || trigger("height")) {
        log("trigger", _.nextBox);
        callback(_.nextBox);
      }
    });

    _.observer.observe(_.ref);
  }, []);

  const get = useCallback((key: BoxKeys) => _.nextBox[key], []);
  const getPrevious = useCallback((key: BoxKeys) => _.prevBox[key], []);
  const setDebug = useCallback((prefix?: string) => (_.debug = prefix), []);

  useEffect(() => {
    log("Mount");

    return () => {
      log("Unmount");
      unSet();
    };
  }, []);
  return { set, unSet, get, getPrevious, setDebug };
}
