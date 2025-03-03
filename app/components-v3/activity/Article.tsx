import CoverImage from "@/app/components-v3/activity/CoverImage";
import MarkdownContent from "@/app/components-v3/activity/MarkdownContent";
import { ActivityWithRefs } from "@/app/types/activity";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

export default function Article({ data }: { data: ActivityWithRefs }) {
  const {
    title,
    tags,
    repository,
    description,
    coverImage,
    coverLink,
    usedTools,
  } = data;

  // TODO: Fix used tool
  return (
    <article className="grid gap-single p-single">
      <header className="grid grid-cols-[auto_max-content]">
        <div>
          <h2 className="relative text-wrap">
            {title}
            <div className="size-[8px] bg-subtle rounded-full border-background border-2 absolute top-1/2 -translate-y-1/2 -left-single -translate-x-1/2" />
          </h2>
          {tags?.length > 0 && (
            <ul className="flex gap-single text-subtle">
              {tags.map((tag) => (
                <li key={tag}>#{tag}</li>
              ))}
            </ul>
          )}
        </div>
        {repository && (
          <a
            href={repository}
            className="flex-none h-[24px] aspect-square text-primary"
          >
            <Icon icon="ph:code" width="100%" height="100%" />
          </a>
        )}
      </header>
      <section className="grid gap-single">
        <MarkdownContent text={description} />
        {coverImage && <CoverImage link={coverLink} src={coverImage} />}
      </section>
      {usedTools?.length > 0 && (
        <footer>
          <ul className="flex gap-single h-[16px] text-subtle">
            {usedTools.map((item) => (
              <li key={item?.icon} className="h-full aspect-square">
                <Icon icon={item?.icon} width="100%" height="100%" />
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
}
