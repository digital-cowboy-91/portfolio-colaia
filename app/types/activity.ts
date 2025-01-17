import { Tool } from "./tools";

export interface Activity {
  date: string;
  title: string;
  description: string;
  tags: string[];
  usedTools: string[];
  coverImage?: string;
  coverLink?: string;
  repository?: string;
}

export interface ActivityWithRefs extends Omit<Activity, "usedTools"> {
  usedTools: Tool[];
}
