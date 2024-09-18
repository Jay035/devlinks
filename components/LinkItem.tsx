import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import { CustomInput } from "./CustomInput";
import Image from "next/image";
import { useGlobalProvider } from "@/context/GlobalProvider";
import { LinkPlatformProps, LinksProps } from "@/types";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  item: LinksProps;
  index: number;
};

export default function LinkItem({ item, index }: Props) {
  const { LinkPlatforms, updateLink, removeLink } = useGlobalProvider();

  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [link, setLink] = useState({
    id: `${index + 1}`,
    platform: {
      icon: "/icons/github.svg",
      name: "GitHub",
    },
    link: "",
  });
  const [selectedLinkPlatform, setSelectedLinkPlatform] =
    useState<LinkPlatformProps>(item.platform);

  const handlePlatformUpdate = (option: LinkPlatformProps) => {
    setSelectedLinkPlatform(option);
    setLink({ ...link, platform: option });

    if (item?.id) {
      updateLink?.(link, "platform", item?.id);
    }
  };

  const handleLinkUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isInputEmpty = e.target.validity.valueMissing;
    // console.log(isInputEmpty)
    setLink({ ...link, link: e.target.value });

    if (item?.id) {
      updateLink?.(link, "link", item?.id);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <section
      key={item.link}
      className="bg-[#fafafa] p-5 flex flex-col gap-3 mb-6"
    >
      <div className="flex justify-between text-grey gap-4 items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/drag.svg"
            width="0"
            height="0"
            className="w-fit cursor-pointer"
            alt="logo"
          />
          <h1 className="font-bold">Link #{index + 1}</h1>
        </div>
        <span
          className="cursor-pointer"
          onClick={() => {
            if (item.id) removeLink?.(item?.id);
          }}
        >
          Remove
        </span>
      </div>
      <div className="">
        <p className="mb-1 text-xs text-dark-grey">Platform</p>
        <CustomSelect
          options={LinkPlatforms!}
          header={selectedLinkPlatform?.name}
          headerIcon={selectedLinkPlatform?.icon}
          onOptionClick={handlePlatformUpdate}
        />
      </div>

      <CustomInput
        inputName="url"
        error=""
        value={link.link}
        placeholder="https://www.github.com/benwright"
        label="Link"
        id={`${selectedLinkPlatform?.name} link`}
        type="url"
        onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleLinkUpdate(e);
          isValidUrl(link.link);
        }}
        iconSrc="/icons/link.svg"
        altText="link icon"
      />
    </section>
  );
}
