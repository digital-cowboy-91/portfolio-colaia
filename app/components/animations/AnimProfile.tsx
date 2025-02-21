import ScrollableSection from "@/app/ScrollableSection";
import { PropsWithChildren, useRef } from "react";

export default function AnimProfile({ children }: PropsWithChildren) {
  const scope = useRef(null);

  return <ScrollableSection>{children}</ScrollableSection>;
}
