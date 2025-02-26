"use client";

import { useSignal } from "@preact/signals-react";
import { useEffect, useRef } from "react";
import { Bookmark } from ".";
import { activeBookmarkSignal, bookmarkListSignal } from "./Navigation";

export default function useRegisterBookmark(bookmark: Bookmark) {
  useSignal();

  const prevProgress = useRef(0);

  useEffect(() => {
    const prev = bookmarkListSignal.value;
    bookmarkListSignal.value = [...prev, bookmark];
  }, []);

  const setProgress = (progress: number) => {
    const _progress = Math.round(progress * 20) / 20;

    if (prevProgress.current === _progress) return;

    activeBookmarkSignal.value = { id: bookmark.id, progress: _progress };

    prevProgress.current = _progress;
  };

  return {
    bookmarkId: bookmark.id,
    setProgress,
  };
}
