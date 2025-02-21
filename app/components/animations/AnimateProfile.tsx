import ScrollableSection from "@/app/ScrollableSection";
import { PropsWithChildren, useRef } from "react";

export default function AnimateProfile({ children }: PropsWithChildren) {
  const scope = useRef(null);

  return <ScrollableSection>{children}</ScrollableSection>;
}
