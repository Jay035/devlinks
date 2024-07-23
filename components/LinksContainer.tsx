import React, { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import { useGlobalProvider } from "@/context/GlobalProvider";
import Image from "next/image";
import { CustomInput } from "./CustomInput";

export function LinkContainer() {
  const { LinkPlatforms } =
    useGlobalProvider();
  const [link, setLink] = useState("");
  const [selectedLinkPlatform, setSelectedLinkPlatform] = useState<LinkPlatformProps>({
    icon: "/icons/github.svg",
    name: "GitHub",
  });

  const onOptionClick = (value: LinkPlatformProps) => {
    setSelectedLinkPlatform(value);
    console.log(value);
  };

  useEffect(() => {
    console.log(selectedLinkPlatform)
  }, [selectedLinkPlatform])

  return (
    <section className="bg-[#fafafa] p-5 flex flex-col gap-3">
      <div className="flex justify-between text-grey gap-4 items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/drag.svg"
            width="0"
            height="0"
            className="w-fit"
            alt="logo"
          />
          <h1 className="font-bold">Link #</h1>
        </div>
        <span className="">Remove</span>
      </div>
      <div className="">
        <p className="mb-1 text-xs text-dark-grey">Platform</p>
        <CustomSelect
          options={LinkPlatforms!}
          header={selectedLinkPlatform?.name}
          headerIcon={selectedLinkPlatform?.icon}
          onOptionClick={onOptionClick}
        />
      </div>
      <CustomInput
        value={link}
        placeholder="https://www.github.com/benwright"
        label="Link"
        id={`${selectedLinkPlatform?.name} link`}
        type="website"
        onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLink(e.target.value)
        }
        iconSrc="/icons/link.svg"
        altText="link icon"
      />
    </section>
  );
}
