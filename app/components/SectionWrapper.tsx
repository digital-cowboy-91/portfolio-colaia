import { PropsWithChildren, Ref, Suspense } from "react";

interface Props extends PropsWithChildren {
  ref?: Ref<HTMLElement>;
  id: string;
  className?: string;
}

export default function SectionWrapper({ id, className, children }: Props) {
  return (
    <section className={`my-32 px-8 ${className}`} id={id}>
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </section>
  );
}
