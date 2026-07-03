import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoVariant = "icon" | "with-name" | "light-bg";

const sources: Record<LogoVariant, string> = {
  icon: "/logosansbackground.png",
  "with-name": "/logoavecnom.jpeg",
  "light-bg": "/logofondblanc.png",
};

type TeamixLogoProps = {
  variant?: LogoVariant;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export function TeamixLogo({
  variant = "icon",
  width,
  height,
  className,
  priority,
}: TeamixLogoProps) {
  return (
    <Image
      src={sources[variant]}
      alt="Teamix"
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority={priority}
    />
  );
}
