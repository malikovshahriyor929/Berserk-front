import Image from "next/image";
import React from "react";
interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  return (
    <Image
      src="/logo.png"
      alt="Tashabbus Logo"
      width={155}
      height={iconOnly ? 26 : 28}
      priority

      className={iconOnly ? "h-8 w-auto min-w-[100px] object-contain" : "h-8 w-auto min-w-[100px] object-contain" }
    ></Image>
  );
}
