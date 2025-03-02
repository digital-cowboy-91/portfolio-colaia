import { readFile } from "@/app/utils/persistantJSON";
import { PropsWithChildren } from "react";
import DataProvider from "./DataProvider";

export default function DataLayer({ children }: PropsWithChildren) {
  const profileData = readFile("profile");
  const toolsData = readFile("tools");
  const activityData = readFile("activity");
  const contributionsData = readFile("contributions");

  return (
    <DataProvider
      profilePromise={profileData}
      toolsPromise={toolsData}
      activityPromise={activityData}
      contributionsPromise={contributionsData}
    >
      {children}
    </DataProvider>
  );
}
