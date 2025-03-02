"use client";

import { Activity } from "@/app/types/activity";
import { Contribution } from "@/app/types/contribution";
import { Profile } from "@/app/types/profile";
import { Tool } from "@/app/types/tools";
import { createContext } from "react";

export type TDataContext = {
  profile: Promise<Profile[]> | null;
  tools: Promise<Tool[]> | null;
  activity: Promise<Activity[]> | null;
  contributions: Promise<Contribution[]> | null;
};

const DataContext = createContext<TDataContext>({
  profile: null,
  tools: null,
  activity: null,
  contributions: null,
});

export default DataContext;
