"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { ActiveBookmark, Bookmark } from ".";

interface UseBookmarkList<T = Bookmark> {
  list: T[];
  setList: Dispatch<SetStateAction<T[]>>;
}

interface UseBookmarkActive<T = ActiveBookmark> {
  active: T;
  setActive: Dispatch<SetStateAction<T>>;
}

type BookmarkContext = UseBookmarkActive & UseBookmarkList;

export const BookmarkContext = createContext({} as BookmarkContext);

export default function BookmarkProvider({ children }: PropsWithChildren) {
  const [list, setList] = useState<UseBookmarkList["list"]>([]);
  const [active, setActive] = useState<UseBookmarkActive["active"]>({
    id: null,
    progress: 0,
  });

  return (
    <BookmarkContext.Provider
      value={{
        list,
        setList,
        active,
        setActive,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
