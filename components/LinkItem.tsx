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
  const { profileData, LinkPlatforms, addLink, updateLink, removeLink } =
    useGlobalProvider();

    const [link, setLink] = useState({
      id: "1",
      platform: {
        icon: "/icons/github.svg",
        name: "GitHub",
      },
      link: "",
    });
  const [selectedLinkPlatform, setSelectedLinkPlatform] =
    useState<LinkPlatformProps>(item.platform);

    

  // const onOptionClick = (value: LinkPlatformProps) => {
  //   setSelectedLinkPlatform(value);
  //   addLink?.();
  //   console.log(profileData);
  // };

  const handlePlatformUpdate = (option: LinkPlatformProps) => {
    setSelectedLinkPlatform(option);
    setLink({ ...link, platform: option });
    const newLink = {
      ...item,
      platform: option,
    };
    if (item?.id) {
      updateLink?.(link, "platform", item?.id);
    }
  };

  const handleLinkUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink({ ...link, link: e.target.value });
    const newLink = {
      ...link,
      link: e.target.value
  }

    if (item?.id) {
      updateLink?.(link, "link", item?.id);
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
            className="w-fit"
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
        error=""
        value={link.link}
        placeholder="https://www.github.com/benwright"
        label="Link"
        id={`${selectedLinkPlatform?.name} link`}
        type="website"
        onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleLinkUpdate(e);
        }}
        iconSrc="/icons/link.svg"
        altText="link icon"
      />
    </section>
  );
}
