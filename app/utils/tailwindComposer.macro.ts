type Compose<T> = {
  [K in keyof T]:
    | string
    | {
        DEFAULT: string;
        [key: string]: string;
      };
};

function transformer<T extends object>(obj: Compose<T>) {
  const result = {} as Record<keyof T, string>;

  for (const key in obj) {
    if (typeof obj[key] === "string") {
      result[key] = obj[key];

      continue;
    }

    result[key] = Object.entries(obj[key])
      .map(([key, value]) => {
        if (key === "DEFAULT") return value;

        return value
          .split(" ")
          .map((item) => key + ":" + item)
          .join(" ");
      })
      .join(" ");
  }

  return result;
}

export const twTransform = transformer;

// twCompose({
//   layout: {
//     DEFAULT:
//       "relative w-full h-full rounded-single flex flex-col items-center gap-double",
//     landscape:
//       "grid place-items-center grid-cols-[minmax(0,1fr)_repeat(2,minmax(300px,960px))_minmax(0,1fr)] grid-rows-1",
//   },
//   imageWrapper: {
//     DEFAULT: "h-full w-full flex flex-col",
//     landscape: "order-2 col-start-3",
//     portrait: "h-[60%]",
//   },
//   image: {
//     DEFAULT:
//       "h-full w-full max-w-[960px] mx-auto object-contain drop-shadow-massive",
//     landscape: "z-10",
//   },
//   frames: {
//     DEFAULT: "h-full w-full",
//     landscape: "relative order-1 col-start-2",
//     portrait: "absolute inset-0",
//   },
//   frameItem: {
//     DEFAULT: "absolute inset-0 flex flex-col justify-center",
//   },
// });
//
// RETURNS
//
// {
//   layout:
//     "relative w-full h-full rounded-single flex flex-col items-center gap-double landscape:grid landscape:place-items-center landscape:grid-cols-[minmax(0,1fr)_repeat(2,minmax(300px,960px))_minmax(0,1fr)] landscape:grid-rows-1",
//   imageWrapper:
//     "h-full w-full flex flex-col landscape:order-2 landscape:col-start-3 portrait:h-[60%]",
//   image:
//     "h-full w-full max-w-[960px] mx-auto object-contain drop-shadow-massive landscape:z-10",
//   frames:
//     "h-full w-full landscape:relative landscape:order-1 landscape:col-start-2 portrait:absolute portrait:inset-0",
//   frameItem: "absolute inset-0 flex flex-col justify-center",
// };
