"use client";

import { GetStarted } from "@/components/GetStarted";
import { SaveBtn } from "@/components/SaveBtn";
import { useState } from "react";

export default function Home() {
  const [linkPresent, setLinkPresent] = useState<boolean>(false);

  const addLink = () => {
    setLinkPresent(true);
  };

  const links = [
    {
      id: 1,
      platform: "GitHub",
      bgColor: "",
      icon: "",
      link: ""
    }
  ];

  return (
    <main className="my-14 px-9 sm:px-16">
      <section>
        <h1 className="text-dark-grey text-2xl font-bold">
          Customize your links
        </h1>
        <p className="text-grey mt-2 mb-10">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <button
          onClick={addLink}
          className="border text-purple border-purple font-semibold px-[1.69rem] py-[0.69rem] rounded-lg text-center w-full"
        >
          + Add new link
        </button>
      </section>
      {linkPresent ? <p>Link</p> : <GetStarted />}
      {/* <div className="w-full"> */}
        <SaveBtn linkPresent={linkPresent} />
      {/* </div> */}
    </main>
  );
}
