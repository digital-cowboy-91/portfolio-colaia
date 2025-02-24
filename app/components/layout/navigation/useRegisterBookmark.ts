"use client";

import { useContext, useEffect } from "react";
import { Bookmark, BookmarkContext } from ".";

export default function useRegisterBookmark(bookmark: Bookmark) {
  const { setList, setActive } = useContext(BookmarkContext);

  useEffect(() => {
    setList((prev) => [...prev, bookmark]);
  }, []);

  const setProgress = (progress: number) =>
    setActive({ id: bookmark.id, progress });

  return {
    bookmarkId: bookmark.id,
    setProgress,
  };
}
