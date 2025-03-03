type Bookmark = {
  id: string;
  title: string;
  icon?: string;
};

type ActiveBookmark = {
  id: string | null;
  progress: number;
};

export type { ActiveBookmark, Bookmark };

import Navigation from "./Navigation";
export default Navigation;

import BookmarkProvider, { BookmarkContext } from "./BookmarkProvider";
import useRegisterBookmark from "./useRegisterBookmark";
export { BookmarkContext, BookmarkProvider, useRegisterBookmark };
