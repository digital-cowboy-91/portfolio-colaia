import { useLenis } from "lenis/react";
import Link from "next/link";
import { Bookmark } from ".";

interface Props {
  bookmark: Bookmark;
  isActive: boolean;
}

export default function MenuItem({ bookmark: { id, title }, isActive }: Props) {
  const lenis = useLenis();

  return (
    <Link
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        lenis?.scrollTo(`#${id}`, {
          immediate: true,
        });
      }}
      className={`flex transition-all`}
      style={{
        color: isActive ? "var(--primary)" : undefined,
      }}
    >
      {title.toUpperCase()}
    </Link>
  );
}
