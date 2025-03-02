"use client";

import { Activity } from "@/app/types/activity";
import { Contribution } from "@/app/types/contribution";
import { Profile } from "@/app/types/profile";
import { Tool } from "@/app/types/tools";
import { ReactNode } from "react";
import Context from "./DataContext";

interface Props {
  children: ReactNode;
  profilePromise: Promise<Profile[]>;
  toolsPromise: Promise<Tool[]>;
  activityPromise: Promise<Activity[]>;
  contributionsPromise: Promise<Contribution[]>;
}

export default function DataProvider({
  children,
  profilePromise,
  toolsPromise,
  activityPromise,
  contributionsPromise,
}: Props) {
  return (
    <Context.Provider
      value={{
        profile: profilePromise,
        tools: toolsPromise,
        activity: activityPromise,
        contributions: contributionsPromise,
      }}
    >
      {children}
    </Context.Provider>
  );
}
