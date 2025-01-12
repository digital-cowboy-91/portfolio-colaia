import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

type Props = {
  horizontal?: boolean;
};

export default function SocialButtons({ horizontal = false }: Props) {
  return (
    <nav
      className={`bg-background flex ${
        horizontal ? "" : "flex-col"
      } gap-1 p-1 rounded-full w-fit`}
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
        <div key={url} className="size-8 relative">
          <a
            href={url}
            className={`
              bg-background rounded-full
              flex items-center
              absolute right-0
              group
              overflow-hidden
            `}
          >
            <Icon icon={icon} width="2rem" />
            <div
              className={`
                w-0 group-hover:w-[calc-size(max-content,size)]
                transition-all
                duration-500
              `}
            >
              <span
                className={`
                ps-2 pe-4 text-nowrap
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
