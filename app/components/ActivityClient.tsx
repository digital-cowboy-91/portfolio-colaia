"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { ActivityWithRefs } from "../types/activity";
import Article from "./Article";

type Props = {
  data: ActivityWithRefs[];
  tags: string[];
};

export default function ActivityClient({ data, tags }: Props) {
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [filterByTags, setFilterByTags] = useState<string[]>([]);

  const monthNames = useRef(
    new Map(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((m) => [
        m.toString(),
        new Date(2000, m, 1)
          .toLocaleDateString("en-GB", { month: "short" })
          .toUpperCase(),
      ])
    )
  );

  const input = useMemo(
    () =>
      data.reduce((acc, item) => {
        const matchFilter =
          filterByTags.length > 0
            ? item.tags.some((tag) => filterByTags.includes(tag))
            : true;

        if (matchFilter) {
          const date = new Date(item.date);

          const year = date.getFullYear();
          const month = date.getMonth();
          const ts = date.getTime() / 1000;

          acc[year] ??= {};
          acc[year][month] ??= {};
          acc[year][month][ts] = item;
        }

        return acc;
      }, {} as Record<number, Record<number, Record<number, ActivityWithRefs>>>),
    [filterByTags]
  );

  const handleTagFilter = (tag: string) =>
    setFilterByTags((prev) => {
      const next = [...prev];
      const indexOfArg = prev.indexOf(tag);

      if (indexOfArg === -1) {
        next.push(tag);
      } else {
        next.splice(indexOfArg, 1);
      }

      return next;
    });

  return (
    <div className="max-w-[900px] mx-auto">
      <h1>Activity</h1>
      <div className="flex gap-single justify-center items-center">
        {tags?.length > 0 && (
          <ul
            className={`
            flex gap-single
            text-subtle
          `}
          >
            {tags.map((tag) => (
              <li
                key={tag}
                className={filterByTags.includes(tag) ? "text-primary" : ""}
              >
                <button onClick={() => handleTagFilter(tag)}>#{tag}</button>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => setSort((prev) => (prev === "desc" ? "asc" : "desc"))}
          className="h-[24px] aspect-square text-primary"
        >
          <Icon
            icon="solar:sort-vertical-line-duotone"
            className={sort === "desc" ? "" : "rotate-180"}
            height={"100%"}
            width={"100%"}
          />
        </button>
      </div>
      <ul className="grid grid-cols-[max-content_1fr]">
        {extractEntries(input, sort).map(([year, months]) => (
          <motion.li
            layout
            className="col-span-2 grid grid-cols-subgrid"
            key={year}
          >
            <CalendarItem label={year} isYear />
            <ul className="col-span-2 grid grid-cols-subgrid">
              {extractEntries(months, sort).map(([month, messages]) => (
                <li key={month} className="col-span-2 grid grid-cols-subgrid">
                  <CalendarItem label={monthNames.current.get(month)!} />
                  <ul>
                    {extractEntries(messages, sort).map(([_ts, item]) => (
                      <motion.li
                        key={item.date}
                        initial={{ opacity: 0 }}
                        whileInView={{
                          opacity: 1,
                          transition: { duration: 0.5 },
                        }}
                        viewport={{
                          margin: "0px 0px -150px 0px",
                          once: true,
                        }}
                        layout
                      >
                        <Article data={item} />
                      </motion.li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// Subcomponents
type CalendarItemProps = {
  label: string;
  isYear?: boolean;
};

function CalendarItem({ label, isYear = false }: CalendarItemProps) {
  return (
    <div
      className={`${
        isYear ? "text-3xl" : ""
      } text-center border-e border-contour p-single relative`}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
        viewport={{
          margin: "0px 0px -150px 0px",
          once: true,
        }}
      >
        {label}
      </motion.span>
      {isYear && (
        <div className="size-[12px] bg-subtle rounded-full border-background border-2 absolute top-1/2 -translate-y-1/2 -right-[0.5px] translate-x-1/2" />
      )}
    </div>
  );
}

// Helpers
function extractEntries<T extends Record<number, T[keyof T]>>(
  obj: T,
  sort: "asc" | "desc"
) {
  const arr = Object.entries(obj);

  if (sort === "desc") return arr.reverse();

  return arr;
}
