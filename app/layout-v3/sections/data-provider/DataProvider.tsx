"use client";

import { Profile } from "@/app/types/profile";
import { Tool } from "@/app/types/tools";
import { ReactNode } from "react";
import Context from "./DataContext";

interface Props {
  children: ReactNode;
  profilePromise: Promise<Profile[]>;
  toolsPromise: Promise<Tool[]>;
}

export default function DataProvider({
  children,
  profilePromise,
  toolsPromise,
}: Props) {
  return (
    <Context.Provider value={{ profile: profilePromise, tools: toolsPromise }}>
      {children}
    </Context.Provider>
  );
}
