import Image from "next/image";
import React from "react";

type Props = {};

export default function PhonePlaceholder({}: Props) {
  return (
    <section className="bg-white lg:flex justify-between items-center w-full h-full hidden">
      <Image
        src="/images/preview-section.svg"
        width="0"
        height="0"
        className="w-fit mx-auto"
        alt="upload"
      />
    </section>
  );
}
