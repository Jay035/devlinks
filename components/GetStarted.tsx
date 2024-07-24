import Image from "next/image";
import React from "react";

type Props = {};

export function GetStarted({}: Props) {
  return (
    <section className="flex  m-6 sm:px-16 bg-[#FAFAFA] flex-col gap-6 items-center text-center p-5 mt-12 sm:py-[5.16rem]">
      <Image
        src="/images/get-started.svg"
        width="0"
        height="0"
        className="w-fit"
        alt=""
      />
      <h2 className="text-2xl text-dark-grey font-bold">Let’s get you started</h2>
      <p className="text-grey max-w-[30.5rem]">
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We’re here to help you share
        your profiles with everyone!
      </p>
    </section>
  );
}
