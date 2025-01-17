import { ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  link?: string;
}

export default function CoverImage({ link, src, ...props }: Props) {
  return (
    <a
      className={`
        rounded-single
        aspect-[10/1] hover:aspect-video
        opacity-75 hover:opacity-100
        transition-all delay-300 duration-300
        overflow-hidden
      `}
      href={link ?? src}
    >
      <img src={src} {...props} className="object-cover" />
    </a>
  );
}
