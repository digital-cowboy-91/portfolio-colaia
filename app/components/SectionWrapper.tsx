import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  className?: string;
}

export default function SectionWrapper({
  className,
  children,
  ...props
}: Props) {
  return (
    <section className={`h-screen p-4 ${className}`} {...props}>
      {children}
    </section>
  );
}
