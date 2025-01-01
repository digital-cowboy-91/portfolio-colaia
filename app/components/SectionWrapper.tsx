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
    <section className={`m-8 rounded-[2rem] bg-white ${className}`} {...props}>
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </section>
  );
}
