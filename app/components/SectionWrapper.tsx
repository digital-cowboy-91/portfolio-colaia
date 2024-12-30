import { PropsWithChildren, Suspense } from "react";

interface Props extends PropsWithChildren {
  ref?: any;
  id: string;
  className?: string;
}

export default function SectionWrapper({
  ref,
  id,
  className,
  children,
}: Props) {
  return (
    <section ref={ref} className={`my-32 px-4 md:px-8 ${className}`} id={id}>
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </section>
  );
}
