import { Tool } from "./tools";

export interface Interest {
  date: string;
  title: string;
  description: string;
  usedTools: string[];
}

export interface InterestsWithRefs extends Omit<Interest, "usedTools"> {
  usedTools: Tool[];
}
