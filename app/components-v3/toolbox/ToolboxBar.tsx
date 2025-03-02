"use client";

import { Tool } from "@/app/types/tools";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { HTMLAttributes } from "react";
import css from "./bar.module.scss";

interface Props extends Omit<HTMLAttributes<HTMLUListElement>, "ref"> {
  items: Tool[];
}

export default function ToolboxBar({ items, ...rest }: Props) {
  return (
    <ul className={css.list} {...rest}>
      {items.map(({ icon }) => (
        <li key={icon}>
          <Icon icon={icon} height="100%" width="100%" noobserver />
        </li>
      ))}
    </ul>
  );
}
