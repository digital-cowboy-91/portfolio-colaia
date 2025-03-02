"use client";

import { use, useContext } from "react";
import DataContext, { TDataContext } from "./DataContext";

export default function useDataResolver<T extends keyof TDataContext>(type: T) {
  const promise = useContext(DataContext)[type];

  if (promise === null) {
    throw new Error("useDataResolver must be used within a DataProvider");
  }

  // following type assertion is necessary to prevent TS errors
  const result = use(promise as Promise<Awaited<TDataContext[T]>>);
  return result as NonNullable<typeof result>;
}
