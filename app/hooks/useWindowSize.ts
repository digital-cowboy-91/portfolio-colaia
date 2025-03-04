import { useEffect, useState } from "react";

type Dimensions = {
  width: null | number;
  height: null | number;
};

export default function useWindowSize() {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: null,
    height: null,
  });

  useEffect(() => {
    if (!window) return;

    const updater = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", updater);

    updater();

    return () => window.removeEventListener("resize", updater);
  }, []);

  return dimensions;
}
