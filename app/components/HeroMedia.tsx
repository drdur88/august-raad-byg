import Image from "next/image";

interface Props {
  videoSrc?: string;
  imageSrc: string;
  imageAlt: string;
}

export default function HeroMedia({ videoSrc, imageSrc, imageAlt }: Props) {
  if (videoSrc) {
    return (
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: .45, mixBlendMode: "luminosity" }}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      fill
      sizes="50vw"
      className="kenburns object-cover"
      style={{ opacity: .45, mixBlendMode: "luminosity" }}
      priority
    />
  );
}
