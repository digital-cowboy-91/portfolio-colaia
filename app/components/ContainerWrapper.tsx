import { HTMLAttributes, Ref } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  id: string;
  ref?: Ref<HTMLDivElement>;
  className?: string;
}

export default function ContainerWrapper({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`rounded-[1rem] relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
