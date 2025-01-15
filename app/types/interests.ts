import { Tool } from "./tools";

export interface Interest {
  date: string;
  title: string;
  description: string;
  tags: string[];
  usedTools: string[];
}

export interface InterestsWithRefs extends Omit<Interest, "usedTools"> {
  usedTools: Tool[];
}
