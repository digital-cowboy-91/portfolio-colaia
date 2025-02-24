import Link from "next/link";
import { Bookmark } from ".";

interface Props {
  bookmark: Bookmark;
  isActive: boolean;
}

export default function MenuItem({ bookmark: { id, title }, isActive }: Props) {
  return (
    <Link
      href={`#${id}`}
      className={`flex transition-all`}
      style={{
        color: isActive ? "var(--primary)" : undefined,
      }}
    >
      {title.toUpperCase()}
    </Link>
  );
}
