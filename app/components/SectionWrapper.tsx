import { HTMLAttributes, Ref, Suspense } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  id: string;
  ref?: Ref<HTMLElement>;
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
