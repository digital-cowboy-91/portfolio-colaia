import Navbar from "./Navbar";

export type Bookmark = {
  id: string;
  title: string;
  icon?: string;
};

export type ActiveBookmark = {
  id: string;
  progress: number;
};

export default Navbar;
