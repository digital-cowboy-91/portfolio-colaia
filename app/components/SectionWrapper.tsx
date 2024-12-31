import { HTMLAttributes, Suspense } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  className?: string;
}

export default function SectionWrapper({
  className,
  children,
  ...props
}: Props) {
  return (
    <section className={`my-32 px-4 md:px-8 ${className}`} {...props}>
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </section>
  );
}
