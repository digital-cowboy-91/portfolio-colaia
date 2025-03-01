import { readFile } from "@/app/utils/persistantJSON";
import { PropsWithChildren } from "react";
import DataProvider from "./DataProvider";

export default function DataLayer({ children }: PropsWithChildren) {
  const profileData = readFile("profile");
  const toolsData = readFile("tools");

  return (
    <DataProvider profilePromise={profileData} toolsPromise={toolsData}>
      {children}
    </DataProvider>
  );
}
