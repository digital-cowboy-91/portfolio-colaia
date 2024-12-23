import "iconify-icon";
import GithubIcon from "./icons/GithubIcon";
import LinkdInIcon from "./icons/LinkdInIcon";

export default function ({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <nav
      className={`bg-foreground flex ${
        horizontal ? "" : "flex-col"
      } gap-1 p-1 rounded-full w-fit`}
    >
      {[
        {
          Icon: LinkdInIcon,
          url: "linkdin.com",
        },
        {
          Icon: GithubIcon,
          url: "github.com",
        },
      ].map(({ Icon, url }) => (
        <a key={url} href={url}>
          <Icon className="text-background w-8 h-8" />
        </a>
      ))}
    </nav>
  );
}
