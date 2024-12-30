import GitHubIcon from "./icons/GitHubIcon";
import LinkdInIcon from "./icons/LinkdInIcon";

type Props = {
  horizontal?: boolean;
};

export default function SocialButtons({ horizontal = false }: Props) {
  return (
    <nav
      className={`bg-foreground flex ${
        horizontal ? "" : "flex-col"
      } gap-1 p-1 rounded-full w-fit`}
    >
      {[
        {
          Icon: LinkdInIcon,
          url: "https://www.linkedin.com/in/dkolaja/",
        },
        {
          Icon: GitHubIcon,
          url: "https://github.com/digital-cowboy-91",
        },
      ].map(({ Icon, url }) => (
        <a key={url} href={url}>
          <Icon className="text-background w-8 h-8" />
        </a>
      ))}
    </nav>
  );
}
