import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Link from "next/link";

export default function SocialLinks() {
  return (
    <>
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
      ].map(({ url, icon }) => (
        <Link key={url} href={url} className="size-[24px] md:size-[32px]">
          <Icon icon={icon} height="100%" width="100%" />
        </Link>
      ))}
    </>
  );
}
