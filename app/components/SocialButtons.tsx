import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

type Props = {
  horizontal?: boolean;
};

export default function SocialButtons({ horizontal = false }: Props) {
  return (
    <nav
      className={`
        bg-background
        flex ${horizontal ? "" : "flex-col"}
        gap-[4px]
        rounded-full w-fit
      `}
    >
      {[
        {
          icon: "entypo-social:linkedin-with-circle",
          url: "https://www.linkedin.com/in/dkolaja/",
          text: "@dkolaja",
        },
        {
          icon: "entypo-social:github-with-circle",
          url: "https://github.com/digital-cowboy-91",
          text: "@digital-cowboy-91",
        },
      ].map(({ icon, url, text }) => (
        <div key={url} className="size-[32px] relative">
          <a
            href={url}
            className={`
              h-full
              bg-background rounded-full
              flex items-center
              absolute right-0
              group
              overflow-hidden
            `}
          >
            <div className="h-full aspect-square">
              <Icon icon={icon} height="100%" width="100%" />
            </div>
            <div
              className={`
                w-0 group-hover:w-[calc-size(max-content,size)]
                transition-all
                duration-500
              `}
            >
              <span
                className={`
                ps-double pe-single text-nowrap
              `}
              >
                {text}
              </span>
            </div>
          </a>
        </div>
      ))}
    </nav>
  );
}
