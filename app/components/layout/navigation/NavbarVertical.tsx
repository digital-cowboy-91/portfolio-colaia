import { ActiveBookmark, Bookmark } from ".";
import ProgressBar from "../ProgressBar";
import MenuItem from "./MenuItem";
import SocialLinks from "./SocialLinks";

interface Props {
  bookmarks: Bookmark[];
  activeBookmark: ActiveBookmark;
}
export default function NavbarVertical({ bookmarks, activeBookmark }: Props) {
  return (
    <div className="fixed inset-y-0 right-0 z-50 flex flex-col justify-center p-double">
      <nav className="w-[32px] flex flex-col gap-single items-center">
        <menu
          className={`flex gap-single text-xl tracking-wider font-semibold`}
          style={{ writingMode: "sideways-rl" }}
        >
          {bookmarks.map((bookmark) => (
            <MenuItem
              key={bookmark.id}
              bookmark={bookmark}
              isActive={bookmark.id === activeBookmark.id}
            />
          ))}
        </menu>
        <ProgressBar
          className="w-full h-[128px]"
          progress={activeBookmark.progress}
          direction="vertical"
        />
        <SocialLinks />
      </nav>
    </div>
  );
}
