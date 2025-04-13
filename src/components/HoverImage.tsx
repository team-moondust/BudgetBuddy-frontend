import { useState, CSSProperties, MouseEvent } from "react";

type HoverImageProps = {
  src: string;
  hoverSrc: string;
  alt?: string;
  style?: CSSProperties;
  className?: string;
  onClick?: (event: MouseEvent<HTMLImageElement>) => void;
};

export function HoverImage({
  src,
  hoverSrc,
  alt = "",
  style,
  className,
  onClick,
}: HoverImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <img
      src={isHovered ? hoverSrc : src}
      alt={alt}
      style={style}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    />
  );
}
