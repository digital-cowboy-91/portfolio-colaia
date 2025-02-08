import { useRef } from "react";

type DOMRectKeys = keyof DOMRectReadOnly;
export default function useResizeObserver() {
  const observer = useRef<ResizeObserver>(null);
  const rect = useRef<DOMRectReadOnly | null>(null);
  const watchedKeys = useRef<DOMRectKeys[]>([]);
  const cb = useRef<(current: Partial<DOMRectReadOnly>) => void>(null);
  const previous = useRef<Partial<DOMRectReadOnly>>({});

  const unSet = () => {
    rect.current = null;
    previous.current = {};
    observer.current?.disconnect();
  };

  const set = (element: Element | null) => {
    unSet();

    if (!element) return;

    const newObserver = new ResizeObserver((e) => {
      const newRect = e[0].contentRect;
      rect.current = newRect;

      if (!watchedKeys.current.length || !cb.current) return;

      let countChange = 0;

      const newReactive = watchedKeys.current.reduce((acc, key) => {
        const prev = previous.current[key];
        const next = newRect[key];

        if (prev !== next) countChange++;

        return { ...acc, [key]: next };
      }, {});

      if (countChange === 0) return;

      cb.current(newReactive);
      previous.current = newReactive;
    });

    newObserver.observe(element);

    observer.current = newObserver;
  };

  const get = (key: DOMRectKeys) => rect.current?.[key] as number | undefined;

  const on = (
    keys: DOMRectKeys[],
    callback: (current: Partial<DOMRectReadOnly>) => void
  ) => {
    watchedKeys.current = keys;
    cb.current = callback;
  };

  return { set, unSet, get, on };
}
