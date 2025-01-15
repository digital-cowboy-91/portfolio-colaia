"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { ActivityWithRefs } from "../types/activity";

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
                className={
                  filterByTags.includes(tag) ? "font-black text-primary" : ""
                }
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
          {/* {sort === "desc" ? (
            <Icon icon="tabler:sort-9-0" height={"100%"} width={"100%"} />
          ) : (
            <Icon icon="tabler:sort-0-9" height={"100%"} width={"100%"} />
          )} */}
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
          <li className="col-span-2 grid grid-cols-subgrid" key={year}>
            <div className="text-3xl text-center border-e border-contour p-single relative">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
                viewport={{
                  margin: "0px 0px -150px 0px",
                  once: true,
                }}
              >
                {year}
              </motion.span>
              <div className="size-[12px] bg-subtle rounded-full border-background border-2 absolute top-1/2 -translate-y-1/2 -right-[0.5px] translate-x-1/2" />
            </div>
            <ul className="col-span-2 grid grid-cols-subgrid">
              {extractEntries(months, sort).map(([month, messages]) => (
                <li key={month} className="col-span-2 grid grid-cols-subgrid">
                  <div className="text-center border-e border-contour p-single">
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{
                        opacity: 1,
                        transition: { duration: 0.5 },
                      }}
                      viewport={{
                        margin: "0px 0px -150px 0px",
                        once: true,
                      }}
                    >
                      {monthNames.current.get(month)}
                    </motion.span>
                  </div>
                  <ul>
                    {extractEntries(messages, sort).map(
                      ([
                        _ts,
                        { date, title, description, usedTools, tags },
                      ]) => (
                        <motion.li
                          key={date}
                          className="flex flex-col p-single pb-double"
                          initial={{ opacity: 0 }}
                          whileInView={{
                            opacity: 1,
                            transition: { duration: 0.5 },
                          }}
                          viewport={{
                            margin: "0px 0px -150px 0px",
                            once: true,
                          }}
                        >
                          <h2 className="relative">
                            {title}
                            <div className="size-[8px] bg-subtle rounded-full border-background border-2 absolute top-1/2 -translate-y-1/2 -left-single -translate-x-1/2" />
                          </h2>
                          {tags?.length > 0 && (
                            <ul className="flex gap-single text-subtle">
                              {tags.map((tag) => (
                                <li
                                  key={tag}
                                  className={
                                    filterByTags.includes(tag)
                                      ? "font-black text-primary"
                                      : ""
                                  }
                                >
                                  #{tag}
                                </li>
                              ))}
                            </ul>
                          )}
                          <p className="mt-single">{description}</p>
                          {usedTools?.length > 0 && (
                            <ul className="flex gap-single h-[16px] text-subtle mt-single">
                              {usedTools.map(({ slug, icon }) => (
                                <li key={slug} className="h-full aspect-square">
                                  <Icon
                                    icon={icon}
                                    width="100%"
                                    height="100%"
                                  />
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.li>
                      )
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Helpers
function extractEntries<T extends Record<number, any>>(
  obj: T,
  sort: "asc" | "desc"
): [string, T[keyof T]][] {
  const arr = Object.entries(obj);

  if (sort === "desc") return arr.reverse();

  return arr;
}
