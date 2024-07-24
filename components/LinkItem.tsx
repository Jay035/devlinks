import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import { CustomInput } from "./CustomInput";
import Image from "next/image";
import { useGlobalProvider } from "@/context/GlobalProvider";
import { LinkPlatformProps, LinksProps } from "@/types";
import { Draggable } from "@hello-pangea/dnd";

type Props = {
  item: LinksProps;
  index: number;
};

export default function LinkItem({ item, index }: Props) {
  const { profileData, LinkPlatforms, addLink, updateLink, removeLink } =
    useGlobalProvider();

  // const platformsNotAdded= LinkPlatforms?.filter(platform => link)
  const [link, setLink] = useState("");
  const [selectedLinkPlatform, setSelectedLinkPlatform] =
    useState<LinkPlatformProps>({
      icon: "/icons/github.svg",
      name: "GitHub",
    });

  const onOptionClick = (value: LinkPlatformProps) => {
    setSelectedLinkPlatform(value);
    addLink?.();
    console.log(profileData);
  };

  const handlePlatformUpdate = (option: LinkPlatformProps) => {
    setSelectedLinkPlatform(option);
    const newLink = {
      ...item,
      platform: option,
    };
    console.log(profileData);

    updateLink?.(newLink);
  };

  const handleLinkUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = {
      ...item,
      link: e.target.value,
    };

    updateLink?.(newLink);
  };

  return (
    <Draggable draggableId={item?.id!} index={index}>
      {(provided) => (
        <section
          key={item.link}
          className="bg-[#fafafa] p-5 flex flex-col gap-3 mb-6"
          ref={provided.innerRef}
          {...provided.draggableProps}
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
              header={item.platform.name}
              headerIcon={item.platform.icon}
              onOptionClick={handlePlatformUpdate}
            />
          </div>
          <CustomInput
            value={item.link}
            placeholder="https://www.github.com/benwright"
            label="Link"
            id={`${selectedLinkPlatform?.name} link`}
            type="website"
            onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLink(e.target.value);
              handleLinkUpdate(e);
              console.log(profileData);
            }}
            iconSrc="/icons/link.svg"
            altText="link icon"
          />
        </section>
      )}
    </Draggable>
  );
}
