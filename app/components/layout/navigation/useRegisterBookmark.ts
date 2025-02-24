"use client";

import { useContext, useEffect, useRef } from "react";
import { Bookmark, BookmarkContext } from ".";

export default function useRegisterBookmark(bookmark: Bookmark) {
  const prevProgress = useRef(0);
  const { setList, setActive } = useContext(BookmarkContext);

  useEffect(() => {
    setList((prev) => [...prev, bookmark]);
  }, []);

  const setProgress = (progress: number) => {
    const _progress = Math.round(progress * 20) / 20;

    if (prevProgress.current === _progress) return;

    setActive({ id: bookmark.id, progress: _progress });
    prevProgress.current = _progress;
  };

  return {
    bookmarkId: bookmark.id,
    setProgress,
  };
}
