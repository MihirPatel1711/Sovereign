import Image from "next/image";

export default function Img({
  src,
  alt = "",
  pos = "center",
  priority = false,
  sizes = "100vw",
  className = "",
}: {
  src: string;
  alt?: string;
  pos?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={90}
      className={`object-cover ${className}`}
      style={{ objectPosition: pos }}
    />
  );
}
