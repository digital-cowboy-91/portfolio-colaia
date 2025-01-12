import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { InterestsWithRefs } from "../types/interests";

type Props = {
  data: InterestsWithRefs[];
};

export default function InterestsClient({ data }: Props) {
  const aggData = data.reduce((acc, item) => {
    const date = new Date(item.date);

    const year = date.getFullYear();
    const month = date.toLocaleDateString("en-GB", { month: "short" });

    acc[year] ??= {};
    acc[year][month] ??= [];

    acc[year][month].unshift(item);

    return acc;
  }, {} as Record<number, Record<string, InterestsWithRefs[]>>);

  return (
    <div className="max-w-[800px] mx-auto">
      <h1>Journey</h1>
      <ul className="grid grid-cols-[max-content_1fr]">
        {Object.entries(aggData)
          .reverse()
          .map(([year, months]) => (
            <li className="col-span-2 grid grid-cols-subgrid" key={year}>
              <div className="text-3xl text-center border-e border-contour p-4 relative">
                {year}
                <div className="size-[12px] bg-contour rounded-full border-background border-2 absolute top-1/2 -translate-y-1/2 -right-[0.5px] translate-x-1/2" />
              </div>
              <ul className="col-span-2 grid grid-cols-subgrid">
                {Object.entries(months).map(([month, items]) => (
                  <li key={month} className="col-span-2 grid grid-cols-subgrid">
                    <div className="text-center border-e border-contour p-4">
                      {month.toUpperCase()}
                    </div>
                    <ul>
                      {items.map(({ date, title, description, usedTools }) => (
                        <li key={date} className="flex flex-col gap-4 p-4">
                          <h2 className="relative">
                            {title}
                            <div className="size-[8px] bg-contour rounded-full border-background border-2 absolute top-1/2 -translate-y-1/2 -left-4 -translate-x-1/2" />
                          </h2>
                          <p>{description}</p>
                          <ul className="flex flex-row gap-4 justify-start flex-shrink">
                            {usedTools.map(({ slug, icon }) => (
                              <li key={slug}>
                                <Icon className="w-auto h-6" icon={icon} />
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
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
