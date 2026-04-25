import Image from "next/image";
import React from "react";
interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  return (
    <Image
      src="/logo-tashabbus-blue.png"
      alt="Tashabbus Logo"
      width={iconOnly ? 48 : 155}
      height={iconOnly ? 26 : 28}
      priority
      className={iconOnly ? "h-8 w-auto" : "h-8 w-auto"}
    ></Image>
  );
}
