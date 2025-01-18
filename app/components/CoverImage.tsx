import Image from "next/image";
import { ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  link?: string;
  width?: number;
  height?: number;
}

export default function CoverImage({
  link,
  src,
  alt = "",
  width = 900,
  height = 900,
  ...props
}: Props) {
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
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        {...props}
        className="object-cover"
      />
    </a>
  );
}
