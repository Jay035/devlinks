import Image from "next/image";
import React from "react";

type Props = {};

export default function Loader({}: Props) {
  return (
    <div className="bg-[#fafafa] flex justify-center items-center h-full w-full absolute top-0 left-0">
      <Image
        src="/icons/logo.svg"
        alt="logo"
        width="0"
        height="0"
        className="w-16 lg:w-32 animate-pulse"
        priority
      />
    </div>
  );
}
