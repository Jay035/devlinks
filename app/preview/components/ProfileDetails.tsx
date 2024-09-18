import React from "react";

type Props = {};

export function ProfileDetails({}: Props) {
  return (
    <section className="my-[60px]">
      <div className="bg-purple p-2 rounded-full w-fit mx-auto">
        <div className="w-[104px] h-[104px] rounded-full bg-[#EEEEEE]"></div>
      </div>
      <div className="mt-[25px] text-center">
        <h1 className="font-bold text-[32px] leading-[48px] text-dark-grey">Bwen</h1>
        <p className="text-grey">ben@example.com</p>
      </div>
    </section>
  );
}
