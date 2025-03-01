"use client";

import { Profile } from "@/app/types/profile";
import { Tool } from "@/app/types/tools";
import { createContext } from "react";

export type TDataContext = {
  profile: Promise<Profile[]> | null;
  tools: Promise<Tool[]> | null;
};

const DataContext = createContext<TDataContext>({
  profile: null,
  tools: null,
});

export default DataContext;
